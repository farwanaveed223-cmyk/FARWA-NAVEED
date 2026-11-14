import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  MapPin,
  Phone,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { DEMO_MEDIA } from '../../assets/demoMedia';
import { DemoReturnBar, ResilientImage } from '../../components/DemoChrome';
import { formatPkr } from '../../utils/demoLogic';

type FinishId = 'champagne-gold' | 'titanium-silver' | 'obsidian-carbon';
type CameraPresetId = 'hero' | 'core' | 'profile' | 'top';

const FINISH_CONFIG: Record<
  FinishId,
  { label: string; chassisColor: number; accentColor: number; coreBg: string; swatch: string }
> = {
  'champagne-gold': {
    label: 'Champagne Gold',
    chassisColor: 0xc6a875,
    accentColor: 0xe6d2aa,
    coreBg: '#12141b',
    swatch: '#C6A875',
  },
  'titanium-silver': {
    label: 'Brushed Titanium',
    chassisColor: 0x94a3b8,
    accentColor: 0x38bdf8,
    coreBg: '#0e1726',
    swatch: '#94A3B8',
  },
  'obsidian-carbon': {
    label: 'Obsidian Carbon',
    chassisColor: 0x26272e,
    accentColor: 0x10b981,
    coreBg: '#090b0f',
    swatch: '#26272E',
  },
};

const CAMERA_PRESETS: Record<CameraPresetId, { label: string; pos: [number, number, number] }> = {
  hero: { label: 'Hero 3/4', pos: [3.6, 2.7, 4.4] },
  core: { label: 'Core Macro', pos: [0.35, 3.4, 1.5] },
  profile: { label: 'Side Profile', pos: [5.1, 0.75, 0.25] },
  top: { label: 'Top Plan', pos: [0.0, 5.4, 0.02] },
};

const SPATIAL_CASE_STUDIES = [
  {
    title: 'Hardware Product Digital Twin',
    sector: 'Industrial Electronics · Islamabad',
    summary: 'Real-time PBR exploded-assembly configurator helping engineering teams inspect tolerances directly in Chrome & Safari.',
    image: DEMO_MEDIA.nexatechHardwareTwin,
  },
  {
    title: 'Spatial AI Robotics Lab',
    sector: 'Defense & R&D · Lahore',
    summary: 'Interactive telemetry viewport connecting IoT factory sensors to a 60fps 3D floor-plan twin.',
    image: DEMO_MEDIA.nexatechSpatialLab,
  },
  {
    title: 'Architectural Real-Estate Walkthrough',
    sector: 'Property Development · Karachi',
    summary: 'Sun-study and finish selector embedded natively into pre-launch apartment reservation portals.',
    image: DEMO_MEDIA.architectureHero,
  },
];

const PACKAGES_3D = [
  {
    name: 'Interactive 3D Hero Showcase',
    pricePkr: 145000,
    timeline: '2 Weeks Delivery',
    desc: 'Custom procedural or CAD-optimized 3D product stage with material finish selector and smooth camera presets.',
  },
  {
    name: 'Full 3D Spatial Brand Website',
    pricePkr: 320000,
    timeline: '4 Weeks Delivery',
    desc: 'Complete commercial website combining a real-time WebGL configurator, exploded specs, CMS gallery, and lead capture.',
  },
  {
    name: 'Enterprise AI & Digital Twin Portal',
    pricePkr: 650000,
    timeline: '6–8 Weeks Delivery',
    desc: 'Multi-object architectural or hardware spatial twin with live data telemetry overlays and performance optimization.',
  },
];

function createCorePlateTexture(bgHex: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const cx = 256;
    const cy = 256;
    const grad = ctx.createRadialGradient(cx, cy, 24, cx, cy, 250);
    grad.addColorStop(0, '#232838');
    grad.addColorStop(1, bgHex);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = 'rgba(220, 201, 163, 0.72)';
    for (let i = 0; i < 48; i++) {
      const angle = (i / 48) * Math.PI * 2;
      const isMajor = i % 4 === 0;
      const r1 = isMajor ? 204 : 218;
      const r2 = 234;
      ctx.lineWidth = isMajor ? 3 : 1.5;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
      ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(198, 168, 117, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, 148, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, 98, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#F2EFEB';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('NEXATECH', cx, 145);
    ctx.fillStyle = '#C6A875';
    ctx.font = '600 12px sans-serif';
    ctx.fillText('SPATIAL ENGINE · PAKISTAN', cx, 168);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function Service3dDemo({ onBack }: { onBack: () => void }) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [finish, setFinish] = useState<FinishId>('champagne-gold');
  const [preset, setPreset] = useState<CameraPresetId>('hero');
  const [exploded, setExploded] = useState<number>(0);
  const [dockOpen, setDockOpen] = useState(true);
  const [webglError, setWebglError] = useState(false);

  const [inqName, setInqName] = useState('');
  const [inqCompany, setInqCompany] = useState('');
  const [inqTier, setInqTier] = useState(PACKAGES_3D[1].name);
  const [inqSent, setInqSent] = useState(false);

  const explodedTargetRef = useRef(0);
  const finishRef = useRef<FinishId>('champagne-gold');
  const cameraTargetPosRef = useRef<THREE.Vector3 | null>(null);
  const requestRenderRef = useRef<() => void>(() => {});
  const applyFinishRef = useRef<(f: FinishId) => void>(() => {});

  useEffect(() => {
    explodedTargetRef.current = exploded / 100;
    requestRenderRef.current();
  }, [exploded]);

  useEffect(() => {
    finishRef.current = finish;
    applyFinishRef.current(finish);
    requestRenderRef.current();
  }, [finish]);

  const selectPreset = (id: CameraPresetId) => {
    setPreset(id);
    const [x, y, z] = CAMERA_PRESETS[id].pos;
    cameraTargetPosRef.current = new THREE.Vector3(x, y, z);
    requestRenderRef.current();
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = (() => {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglError(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.28;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    let lastW = container.clientWidth || 800;
    let lastH = container.clientHeight || 560;
    renderer.setSize(lastW, lastH);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglError(true);
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0c10);
    scene.fog = new THREE.FogExp2(0x0b0c10, 0.045);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(40, lastW / lastH, 0.1, 100);
    camera.position.set(...CAMERA_PRESETS.hero.pos);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.minDistance = 2.2;
    controls.maxDistance = 8.5;
    controls.maxPolarAngle = Math.PI * 0.58;
    controls.target.set(0, -0.18, 0);

    controls.addEventListener('start', () => {
      cameraTargetPosRef.current = null;
    });

    const hemiLight = new THREE.HemisphereLight(0xe2e8f0, 0x292524, 1.15);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffbeb, 2.6);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x7dd3fc, 1.45);
    rimLight.position.set(-4, 3, -4);
    scene.add(rimLight);

    const chassisMaterial = new THREE.MeshPhysicalMaterial({
      color: FINISH_CONFIG['champagne-gold'].chassisColor,
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 0.4,
    });
    const accentMaterial = new THREE.MeshStandardMaterial({
      color: FINISH_CONFIG['champagne-gold'].accentColor,
      metalness: 0.88,
      roughness: 0.24,
    });
    const matteBasaltMaterial = new THREE.MeshStandardMaterial({
      color: 0x17181f,
      metalness: 0.45,
      roughness: 0.62,
    });
    const emitterMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.2,
      roughness: 0.18,
      emissive: 0x78350f,
    });

    let plateTexture = createCorePlateTexture(FINISH_CONFIG['champagne-gold'].coreBg);
    plateTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const plateMaterial = new THREE.MeshStandardMaterial({
      map: plateTexture,
      color: 0xffffff,
      metalness: 0.35,
      roughness: 0.42,
    });

    const domeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0.06,
      transmission: isSoftwareGl ? 0 : 0.86,
      transparent: true,
      opacity: isSoftwareGl ? 0.22 : 1,
      ior: 1.54,
      depthWrite: false,
    });

    const assemblyGroup = new THREE.Group();
    scene.add(assemblyGroup);

    const baseplate = new THREE.Mesh(
      new THREE.CylinderGeometry(1.42, 1.36, 0.14, 48),
      matteBasaltMaterial,
    );
    baseplate.position.y = -0.32;
    assemblyGroup.add(baseplate);

    const chassisGroup = new THREE.Group();
    const hull = new THREE.Mesh(
      new THREE.CylinderGeometry(1.5, 1.46, 0.34, 48),
      chassisMaterial,
    );
    chassisGroup.add(hull);

    const ribShape = new THREE.Shape();
    ribShape.moveTo(-0.14, 0);
    ribShape.lineTo(0.14, 0);
    ribShape.lineTo(0.1, 0.52);
    ribShape.lineTo(-0.1, 0.52);
    ribShape.closePath();
    const ribGeo = new THREE.ExtrudeGeometry(ribShape, {
      depth: 0.18,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.025,
      bevelSegments: 2,
    });

    const ribAngles = [Math.PI * 0.25, Math.PI * 0.75, Math.PI * 1.25, Math.PI * 1.75];
    ribAngles.forEach((angle) => {
      const rib = new THREE.Mesh(ribGeo, chassisMaterial);
      rib.rotation.order = 'YXZ';
      rib.position.set(Math.sin(angle) * 1.35, 0.06, Math.cos(angle) * 1.35);
      rib.rotation.set(Math.PI / 2 + 0.14, angle, 0);
      chassisGroup.add(rib);
    });

    const portModule = new THREE.Group();
    const portNeck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.09, 0.24, 16),
      accentMaterial,
    );
    portNeck.rotation.z = Math.PI / 2;
    const portCap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.19, 0.19, 0.16, 24),
      chassisMaterial,
    );
    portCap.rotation.z = Math.PI / 2;
    portCap.position.x = 0.14;
    portModule.add(portNeck, portCap);
    portModule.position.set(1.58, 0, 0);
    chassisGroup.add(portModule);
    assemblyGroup.add(chassisGroup);

    const coreLayer = new THREE.Group();
    const plateBase = new THREE.Mesh(
      new THREE.CylinderGeometry(1.3, 1.3, 0.045, 48),
      matteBasaltMaterial,
    );
    plateBase.position.y = 0.15;
    const plateSurface = new THREE.Mesh(new THREE.CircleGeometry(1.29, 48), plateMaterial);
    plateSurface.rotation.x = -Math.PI / 2;
    plateSurface.position.y = 0.175;
    coreLayer.add(plateBase, plateSurface);

    const finGeo = new THREE.BoxGeometry(0.05, 0.045, 0.18);
    const fins = new THREE.InstancedMesh(finGeo, accentMaterial, 16);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      dummy.position.set(Math.sin(a) * 1.07, 0.205, Math.cos(a) * 1.07);
      dummy.rotation.set(0, a, 0);
      dummy.updateMatrix();
      fins.setMatrixAt(i, dummy.matrix);
    }
    fins.computeBoundingSphere();
    coreLayer.add(fins);

    const gyroGroup = new THREE.Group();
    const outerGyro = new THREE.Mesh(
      new THREE.TorusGeometry(0.36, 0.036, 12, 32),
      accentMaterial,
    );
    outerGyro.rotation.x = Math.PI / 2;
    const crossStrut = new THREE.Mesh(
      new THREE.BoxGeometry(0.68, 0.03, 0.06),
      chassisMaterial,
    );
    const coreBeacon = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.11, 1),
      emitterMaterial,
    );
    coreBeacon.position.y = 0.05;
    gyroGroup.add(outerGyro, crossStrut, coreBeacon);
    gyroGroup.position.set(0, 0.23, 0.34);
    coreLayer.add(gyroGroup);

    [Math.PI * 0.25, Math.PI * 0.75, Math.PI * 1.25, Math.PI * 1.75].forEach((a) => {
      const node = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.04, 0.14), accentMaterial);
      node.position.set(Math.sin(a) * 0.8, 0.215, Math.cos(a) * 0.8);
      node.rotation.y = a;
      coreLayer.add(node);
    });
    assemblyGroup.add(coreLayer);

    const collarProfile = [
      new THREE.Vector2(1.28, 0),
      new THREE.Vector2(1.5, 0),
      new THREE.Vector2(1.45, 0.16),
      new THREE.Vector2(1.32, 0.22),
      new THREE.Vector2(1.28, 0.16),
    ];
    const collar = new THREE.Mesh(new THREE.LatheGeometry(collarProfile, 48), chassisMaterial);
    collar.position.y = 0.19;
    assemblyGroup.add(collar);

    const glassDome = new THREE.Mesh(
      new THREE.CylinderGeometry(1.29, 1.31, 0.07, 48),
      domeMaterial,
    );
    glassDome.renderOrder = 5;
    glassDome.position.y = 0.42;
    assemblyGroup.add(glassDome);

    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(2.1, 2.35, 0.22, 48),
      new THREE.MeshStandardMaterial({ color: 0x1e202b, metalness: 0.35, roughness: 0.7 }),
    );
    pedestal.position.y = -1.15;
    assemblyGroup.add(pedestal);

    const pedestalRim = new THREE.Mesh(
      new THREE.TorusGeometry(2.08, 0.018, 12, 64),
      accentMaterial,
    );
    pedestalRim.rotation.x = Math.PI / 2;
    pedestalRim.position.y = -1.035;
    assemblyGroup.add(pedestalRim);

    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sctx = shadowCanvas.getContext('2d');
    if (sctx) {
      const sgrad = sctx.createRadialGradient(64, 64, 8, 64, 64, 60);
      sgrad.addColorStop(0, 'rgba(0,0,0,0.7)');
      sgrad.addColorStop(1, 'rgba(0,0,0,0)');
      sctx.fillStyle = sgrad;
      sctx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const contactShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(3.5, 3.5),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, opacity: 0.6 }),
    );
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = -1.03;
    assemblyGroup.add(contactShadow);

    applyFinishRef.current = (nextFinish: FinishId) => {
      const cfg = FINISH_CONFIG[nextFinish];
      chassisMaterial.color.setHex(cfg.chassisColor);
      accentMaterial.color.setHex(cfg.accentColor);
      plateTexture.dispose();
      plateTexture = createCorePlateTexture(cfg.coreBg);
      plateTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      plateMaterial.map = plateTexture;
      plateMaterial.needsUpdate = true;
    };

    let rafId = 0;
    let timerId = 0;
    let disposed = false;
    let renderBusy = false;
    let renderDirty = false;
    let currentExploded = 0;
    let pointerX = 0;
    let pointerY = 0;
    let lastTime = performance.now();

    function afterDraw(cb: () => void) {
      if (disposed) return;
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          timerId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          timerId = window.setTimeout(cb, 80);
        }
      };
      timerId = window.setTimeout(poll, 5);
    }

    function requestRender() {
      if (disposed) return;
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      rafId = requestAnimationFrame(() => {
        if (disposed) return;
        renderDirty = false;
        const now = performance.now();
        const delta = Math.min(0.05, (now - lastTime) / 1000);
        lastTime = now;

        let animating = false;

        const expDiff = Math.abs(currentExploded - explodedTargetRef.current);
        if (expDiff > 0.002) {
          currentExploded = THREE.MathUtils.damp(
            currentExploded,
            explodedTargetRef.current,
            8,
            delta,
          );
          animating = true;
        } else {
          currentExploded = explodedTargetRef.current;
        }

        baseplate.position.y = -0.32 - currentExploded * 0.72;
        coreLayer.position.y = currentExploded * 0.48;
        collar.position.y = 0.19 + currentExploded * 0.96;
        glassDome.position.y = 0.42 + currentExploded * 1.44;
        gyroGroup.rotation.y += delta * 0.75;

        const targetPos = cameraTargetPosRef.current;
        if (targetPos) {
          camera.position.x = THREE.MathUtils.damp(camera.position.x, targetPos.x, 6, delta);
          camera.position.y = THREE.MathUtils.damp(camera.position.y, targetPos.y, 6, delta);
          camera.position.z = THREE.MathUtils.damp(camera.position.z, targetPos.z, 6, delta);
          if (camera.position.distanceTo(targetPos) < 0.02) {
            camera.position.copy(targetPos);
            cameraTargetPosRef.current = null;
          } else {
            animating = true;
          }
        }

        assemblyGroup.rotation.z = THREE.MathUtils.damp(
          assemblyGroup.rotation.z,
          -pointerX * 0.08,
          6,
          delta,
        );
        assemblyGroup.rotation.x = THREE.MathUtils.damp(
          assemblyGroup.rotation.x,
          pointerY * 0.06,
          6,
          delta,
        );

        controls.update();
        renderer.render(scene, camera);

        const done = () => {
          renderBusy = false;
          if (!disposed && (renderDirty || animating)) {
            requestRender();
          }
        };
        if (isSoftwareGl) afterDraw(done);
        else done();
      });
    }

    requestRenderRef.current = requestRender;
    controls.addEventListener('change', requestRender);

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      pointerX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      requestRender();
    };
    container.addEventListener('pointermove', onPointerMove);

    const onResize = () => {
      if (!container || disposed) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 560;
      if (w === lastW && h === lastH) return;
      lastW = w;
      lastH = h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      requestRender();
    };
    window.addEventListener('resize', onResize);
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    requestRender();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', onResize);
      container.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      controls.dispose();
      plateTexture.dispose();
      shadowTex.dispose();
      chassisMaterial.dispose();
      accentMaterial.dispose();
      matteBasaltMaterial.dispose();
      emitterMaterial.dispose();
      plateMaterial.dispose();
      domeMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#0B0C10] text-[#F2EFEB]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
      data-state="ready"
    >
      <DemoReturnBar
        demoName="3D Website Design"
        clientBrand="NexaTech"
        categoryLabel="Service Demo 15"
        onBack={onBack}
        theme="dark"
      />

      {/* Top Studio Header */}
      <header className="border-b border-white/10 bg-[#0B0C10]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
          <a
            href="#nt-viewport"
            className="text-xl font-bold tracking-tight text-[#C6A875] whitespace-nowrap shrink-0"
            style={{ fontFamily: '"Outfit", sans-serif' }}
          >
            NEXATECH 3D
          </a>
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-neutral-300">
            <a href="#nt-capabilities" className="hover:text-[#C6A875] whitespace-nowrap">Capabilities</a>
            <a href="#nt-showcase" className="hover:text-[#C6A875] whitespace-nowrap">Spatial Twins</a>
            <a href="#nt-packages" className="hover:text-[#C6A875] whitespace-nowrap">PKR Packages</a>
            <a href="#nt-faq" className="hover:text-[#C6A875] whitespace-nowrap">FAQ</a>
          </nav>
          <a
            href="#nt-contact"
            className="rounded-lg bg-[#C6A875] px-4 py-2 text-xs font-bold text-[#090909] hover:bg-[#DCC9A3] whitespace-nowrap shrink-0"
          >
            Commission 3D Site
          </a>
        </div>
      </header>

      {/* Isolated Bounded 3D WebGL Interactive Stage */}
      <section
        id="nt-viewport"
        className="relative h-[540px] sm:h-[620px] w-full overflow-hidden border-b border-white/10"
      >
        <div
          ref={mountRef}
          data-testid="three-canvas-stage"
          className="absolute inset-0 h-full w-full"
        />

        {webglError && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0B0C10] p-8 text-center">
            <div className="max-w-md rounded-2xl border border-white/10 bg-[#14161D] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C6A875]">
                3D Viewport Notice
              </p>
              <h2 className="mt-2 text-xl font-bold">WebGL Context Unavailable</h2>
              <p className="mt-2 text-sm text-neutral-400">
                Your browser paused hardware 3D rendering. Reload or enable WebGL to inspect the
                interactive NexaTech Spatial Core model.
              </p>
            </div>
          </div>
        )}

        {/* Top-left editorial identity */}
        <div className="pointer-events-none relative z-10 max-w-md p-5 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#C6A875]">
            NexaTech · Pakistan 3D &amp; Spatial Web Studio
          </p>
          <h1
            className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-4xl"
            style={{ fontFamily: '"Outfit", sans-serif' }}
          >
            NexaCore X1 Spatial Engine
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-neutral-300">
            Real-time WebGL hardware configurator for Pakistani industrial engineering, consumer
            electronics, and architectural twin portals. Drag anywhere to orbit 360°.
          </p>
        </div>

        {/* Collapsible Bottom Control Dock pinned cleanly inside Stage */}
        <div className="absolute bottom-4 left-1/2 z-20 w-[min(1020px,95vw)] -translate-x-1/2">
          <div className="flex justify-center mb-1.5">
            <button
              type="button"
              onClick={() => setDockOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#12141B] px-3.5 py-1 text-[11px] font-semibold text-[#DCC9A3] hover:border-[#C6A875] cursor-pointer"
            >
              {dockOpen ? (
                <>
                  <ChevronDown className="h-3.5 w-3.5" />
                  <span>Hide Controls</span>
                </>
              ) : (
                <>
                  <ChevronUp className="h-3.5 w-3.5" />
                  <span>Show Controls</span>
                </>
              )}
            </button>
          </div>

          {dockOpen && (
            <div className="rounded-2xl border border-white/15 bg-[#12141B]/95 px-4 py-3.5 shadow-2xl">
              <div className="grid gap-4 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-3">
                  <div className="flex justify-between text-[11px] font-semibold text-neutral-300">
                    <label htmlFor="nexa-explode">Exploded Assembly</label>
                    <span className="font-mono tabular-nums text-[#C6A875]">{exploded}%</span>
                  </div>
                  <input
                    id="nexa-explode"
                    type="range"
                    min={0}
                    max={100}
                    value={exploded}
                    onChange={(e) => setExploded(Number(e.target.value))}
                    className="mt-1.5 w-full accent-[#C6A875]"
                  />
                </div>

                <div className="lg:col-span-5">
                  <p className="text-[11px] font-semibold text-neutral-300 mb-1.5">
                    Chassis Finish
                  </p>
                  <div className="flex flex-wrap sm:flex-nowrap gap-1.5">
                    {(Object.keys(FINISH_CONFIG) as FinishId[]).map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setFinish(id)}
                        className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold cursor-pointer ${
                          finish === id
                            ? 'border-[#C6A875] bg-[#C6A875]/15 text-white'
                            : 'border-white/10 bg-black/40 text-neutral-300'
                        }`}
                      >
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: FINISH_CONFIG[id].swatch }}
                        />
                        <span>{FINISH_CONFIG[id].label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[11px] font-semibold text-neutral-300">Camera Angle</p>
                    <button
                      type="button"
                      onClick={() => {
                        setExploded(0);
                        setFinish('champagne-gold');
                        selectPreset('hero');
                      }}
                      className="inline-flex items-center gap-1 text-[11px] text-[#C6A875] hover:underline cursor-pointer"
                    >
                      <RotateCcw className="h-3 w-3" /> Reset
                    </button>
                  </div>
                  <div className="flex flex-wrap sm:flex-nowrap gap-1.5">
                    {(Object.keys(CAMERA_PRESETS) as CameraPresetId[]).map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => selectPreset(id)}
                        className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[11px] font-semibold cursor-pointer ${
                          preset === id
                            ? 'bg-[#C6A875] text-[#090909]'
                            : 'border border-white/10 bg-black/40 text-neutral-300'
                        }`}
                      >
                        {CAMERA_PRESETS[id].label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Complete Futuristic 3D & AI Technology Content Sections */}
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 space-y-20">
        {/* AI & 3D Engineering Services */}
        <section id="nt-capabilities" className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Cpu,
              title: '01. Procedural & CAD 3D Pipelines',
              desc: 'Precision WebGL engineering combining physically based metals, optical glass domes, and smooth kinematic animations.',
            },
            {
              icon: Layers,
              title: '02. Exploded Assembly Configurators',
              desc: 'Give engineering buyers interactive layer inspections, finish switchers, and instant PKR quote triggers.',
            },
            {
              icon: Sparkles,
              title: '03. Spatial AI & Digital Twins',
              desc: 'Connect live sensor feeds and room geometry into lightweight browser experiences with zero plugins required.',
            },
          ].map((svc) => {
            const Icon = svc.icon;
            return (
              <div key={svc.title} className="rounded-2xl border border-white/10 bg-[#12141B] p-6 space-y-3">
                <Icon className="h-5 w-5 text-[#C6A875]" />
                <h2 className="text-lg font-bold text-white" style={{ fontFamily: '"Outfit", sans-serif' }}>
                  {svc.title}
                </h2>
                <p className="text-xs leading-relaxed text-neutral-400">{svc.desc}</p>
              </div>
            );
          })}
        </section>

        {/* Spatial Twin Case Studies */}
        <section id="nt-showcase" className="space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C6A875]">
              Production 3D Deployments
            </p>
            <h2 className="mt-1 text-3xl font-bold text-white" style={{ fontFamily: '"Outfit", sans-serif' }}>
              3D Product &amp; Spatial Twin Showcase
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {SPATIAL_CASE_STUDIES.map((cs) => (
              <article key={cs.title} className="overflow-hidden rounded-2xl border border-white/10 bg-[#12141B]">
                <div className="aspect-[16/10] overflow-hidden bg-black">
                  <ResilientImage
                    src={cs.image}
                    alt={cs.title}
                    className="h-full w-full object-cover"
                    fallbackLabel={cs.title}
                  />
                </div>
                <div className="p-5 space-y-2">
                  <p className="text-[11px] font-semibold text-[#C6A875]">{cs.sector}</p>
                  <h3 className="text-base font-bold text-white">{cs.title}</h3>
                  <p className="text-xs leading-relaxed text-neutral-400">{cs.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Transparent PKR Packages */}
        <section id="nt-packages" className="space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C6A875]">
              Fixed Scope Pricing
            </p>
            <h2 className="mt-1 text-3xl font-bold text-white" style={{ fontFamily: '"Outfit", sans-serif' }}>
              3D Web &amp; Spatial AI Investment Tiers (PKR)
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {PACKAGES_3D.map((pkg, idx) => (
              <div
                key={pkg.name}
                className={`flex flex-col justify-between rounded-2xl border p-6 ${
                  idx === 1 ? 'border-[#C6A875] bg-[#161922]' : 'border-white/10 bg-[#12141B]'
                }`}
              >
                <div>
                  <p className="text-xs font-semibold text-[#C6A875]">{pkg.timeline}</p>
                  <h3 className="mt-1.5 text-lg font-bold text-white">{pkg.name}</h3>
                  <p className="mt-3 font-mono text-2xl font-bold text-white tabular-nums">
                    {formatPkr(pkg.pricePkr)}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-neutral-400">{pkg.desc}</p>
                </div>
                <a
                  href="#nt-contact"
                  onClick={() => setInqTier(pkg.name)}
                  className="mt-6 block rounded-lg bg-[#C6A875] py-2.5 text-center text-xs font-bold text-[#090909] hover:bg-[#DCC9A3]"
                >
                  Select 3D Tier
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ + Contact Inquiry */}
        <section id="nt-faq" className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: '"Outfit", sans-serif' }}>
              Technical FAQ &amp; Testimonial
            </h2>
            {[
              {
                q: 'Do NexaTech 3D scenes work on Pakistani 4G mobile devices?',
                a: 'Yes — on-demand rendering pipelines, adaptive pixel ratios, and lightweight procedural geometry keep mobile battery & data minimal.',
              },
              {
                q: 'Can you convert SolidWorks, STEP, or Blender models for WebGL?',
                a: 'We decimate high-poly CAD meshes, bake studio AO maps, and deliver sub-2MB Draco-compressed web assets.',
              },
            ].map((item) => (
              <div key={item.q} className="rounded-xl border border-white/10 bg-[#12141B] p-4 text-xs">
                <p className="font-bold text-white">{item.q}</p>
                <p className="mt-1 text-neutral-400">{item.a}</p>
              </div>
            ))}

            <blockquote className="rounded-xl border border-[#C6A875]/30 bg-[#14161D] p-5 text-xs space-y-2">
              <div className="flex justify-between text-[11px] text-[#C6A875]">
                <span>Partner Feedback</span>
                <span>Sample Content</span>
              </div>
              <p className="text-neutral-200 leading-relaxed">
                &ldquo;Embedding an interactive exploded 3D viewer on our industrial hardware page
                helped overseas distributors understand internal cooling channels before booking a
                technical call.&rdquo;
              </p>
              <footer className="font-bold text-white">— Salman Qureshi, Islamabad Robotics Lab</footer>
            </blockquote>
          </div>

          <div id="nt-contact" className="lg:col-span-6 rounded-2xl border border-white/10 bg-[#12141B] p-7 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C6A875]">
              Commission a 3D Experience
            </p>
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: '"Outfit", sans-serif' }}>
              Start Your 3D Web Project
            </h2>

            {inqSent ? (
              <div role="status" className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-5 text-xs space-y-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <p className="font-bold text-white">3D Consultation Logged (Demo)</p>
                <p className="text-neutral-300">
                  Inquiry recorded for <strong>{inqName}</strong> ({inqCompany}) — {inqTier}.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!inqName.trim() || !inqCompany.trim()) return;
                  setInqSent(true);
                }}
                className="space-y-3 text-xs"
              >
                <input
                  type="text"
                  required
                  aria-label="Your Name"
                  placeholder="Your Full Name"
                  value={inqName}
                  onChange={(e) => setInqName(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-black/50 px-3.5 py-2.5 text-white"
                />
                <input
                  type="text"
                  required
                  aria-label="Company or Product Name"
                  placeholder="Company / Hardware Product Name"
                  value={inqCompany}
                  onChange={(e) => setInqCompany(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-black/50 px-3.5 py-2.5 text-white"
                />
                <select
                  aria-label="Selected 3D package"
                  value={inqTier}
                  onChange={(e) => setInqTier(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-[#0B0C10] px-3.5 py-2.5 text-white"
                >
                  {PACKAGES_3D.map((p) => <option key={p.name}>{p.name}</option>)}
                </select>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#C6A875] py-3 font-bold text-[#090909] hover:bg-[#DCC9A3] cursor-pointer"
                >
                  Send 3D Proposal Request (Demo)
                </button>
              </form>
            )}
          </div>
        </section>
      </div>

      {/* Futuristic Studio Footer */}
      <footer className="bg-[#07080A] text-neutral-400 border-t border-white/10">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 text-xs">
          <div className="md:col-span-2 space-y-2">
            <p className="text-xl font-bold text-[#C6A875]" style={{ fontFamily: '"Outfit", sans-serif' }}>
              NEXATECH 3D STUDIO
            </p>
            <p className="max-w-sm leading-relaxed">
              WebGL hardware showcases, interactive digital twins, and futuristic spatial interfaces
              crafted in Pakistan for ambitious product brands.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Engineering</p>
            <ul className="space-y-1.5">
              <li><a href="#nt-viewport" className="hover:text-[#C6A875]">Interactive 3D Stage</a></li>
              <li><a href="#nt-showcase" className="hover:text-[#C6A875]">Spatial Case Studies</a></li>
              <li><a href="#nt-packages" className="hover:text-[#C6A875]">PKR Tiers</a></li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Labs</p>
            <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#C6A875]" /> NSTP, Sector H-12, Islamabad</p>
            <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-[#C6A875]" /> spatial@nexatech.pk</p>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-[11px] text-neutral-500">
          NexaTech · Interactive 3D &amp; Spatial Web Demo (Sample Content)
        </div>
      </footer>
    </div>
  );
}
