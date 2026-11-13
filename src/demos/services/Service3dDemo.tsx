import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { DemoReturnBar } from '../../components/DemoChrome';

type FinishId = 'rose-gold' | 'platinum' | 'obsidian';
type CameraPresetId = 'hero' | 'dial' | 'profile' | 'top';

const FINISH_CONFIG: Record<
  FinishId,
  { label: string; caseColor: number; accentColor: number; dialBg: string; swatch: string }
> = {
  'rose-gold': {
    label: '18k Rose Gold',
    caseColor: 0xd4a373,
    accentColor: 0xe6c89c,
    dialBg: '#121216',
    swatch: '#D4A373',
  },
  platinum: {
    label: 'Brushed Platinum',
    caseColor: 0xd9dde3,
    accentColor: 0xc6a875,
    dialBg: '#0f172a',
    swatch: '#D9DDE3',
  },
  obsidian: {
    label: 'Obsidian DLC',
    caseColor: 0x27272a,
    accentColor: 0xdcc9a3,
    dialBg: '#09090b',
    swatch: '#27272A',
  },
};

const CAMERA_PRESETS: Record<CameraPresetId, { label: string; pos: [number, number, number] }> = {
  hero: { label: 'Hero 3/4', pos: [3.2, 2.5, 4.1] },
  dial: { label: 'Dial Macro', pos: [0.3, 3.6, 1.4] },
  profile: { label: 'Side Profile', pos: [4.8, 0.7, 0.2] },
  top: { label: 'Top Plan', pos: [0.0, 5.2, 0.01] },
};

function createDialTexture(bgHex: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const cx = 256;
    const cy = 256;
    const grad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 250);
    grad.addColorStop(0, '#262833');
    grad.addColorStop(1, bgHex);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Minute track ticks
    ctx.strokeStyle = 'rgba(220, 201, 163, 0.75)';
    for (let i = 0; i < 60; i++) {
      const angle = (i / 60) * Math.PI * 2;
      const isHour = i % 5 === 0;
      const r1 = isHour ? 210 : 220;
      const r2 = 234;
      ctx.lineWidth = isHour ? 3 : 1.5;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
      ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2);
      ctx.stroke();
    }

    // Guilloche inner chapter ring
    ctx.strokeStyle = 'rgba(198, 168, 117, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, 152, 0, Math.PI * 2);
    ctx.stroke();

    // Brand typography on dial
    ctx.fillStyle = '#F2EFEB';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CHRONOS', cx, 148);
    ctx.fillStyle = '#C6A875';
    ctx.font = '600 11px sans-serif';
    ctx.fillText('CALIBRE 09 · GENEVE', cx, 168);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function Service3dDemo({ onBack }: { onBack: () => void }) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [finish, setFinish] = useState<FinishId>('rose-gold');
  const [preset, setPreset] = useState<CameraPresetId>('hero');
  const [exploded, setExploded] = useState<number>(0);
  const [dockOpen, setDockOpen] = useState(true);
  const [webglError, setWebglError] = useState(false);

  const explodedTargetRef = useRef(0);
  const finishRef = useRef<FinishId>('rose-gold');
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

    // Software WebGL guard per Three.js skill
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
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(container.clientWidth || 800, container.clientHeight || 600);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglError(true);
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0c10);
    scene.fog = new THREE.FogExp2(0x0b0c10, 0.055);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(
      40,
      (container.clientWidth || 800) / (container.clientHeight || 600),
      0.1,
      100,
    );
    camera.position.set(...CAMERA_PRESETS.hero.pos);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.minDistance = 2.2;
    controls.maxDistance = 8.5;
    controls.maxPolarAngle = Math.PI * 0.58;
    controls.target.set(0, 0.1, 0);

    controls.addEventListener('start', () => {
      cameraTargetPosRef.current = null;
    });

    // Balanced 3-point warm/cool studio lighting
    const hemiLight = new THREE.HemisphereLight(0xcbd5e1, 0x1c1917, 0.75);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff1d6, 2.2);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x93c5fd, 1.1);
    rimLight.position.set(-4, 3, -4);
    scene.add(rimLight);

    // Materials
    const caseMaterial = new THREE.MeshPhysicalMaterial({
      color: FINISH_CONFIG['rose-gold'].caseColor,
      metalness: 0.95,
      roughness: 0.18,
      clearcoat: 0.4,
    });
    const accentMaterial = new THREE.MeshStandardMaterial({
      color: FINISH_CONFIG['rose-gold'].accentColor,
      metalness: 0.92,
      roughness: 0.24,
    });
    const brushedDarkMaterial = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.65,
      roughness: 0.52,
    });
    const rubyMaterial = new THREE.MeshStandardMaterial({
      color: 0xb91c1c,
      metalness: 0.2,
      roughness: 0.15,
      emissive: 0x450a0a,
    });

    let dialTexture = createDialTexture(FINISH_CONFIG['rose-gold'].dialBg);
    dialTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const dialMaterial = new THREE.MeshStandardMaterial({
      map: dialTexture,
      color: 0xffffff,
      metalness: 0.35,
      roughness: 0.42,
    });

    const crystalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0.05,
      transmission: isSoftwareGl ? 0 : 0.85,
      transparent: true,
      opacity: isSoftwareGl ? 0.22 : 1,
      ior: 1.55,
      depthWrite: false,
    });

    // Watch Assembly Group (12+ distinct procedural parts)
    const watchGroup = new THREE.Group();
    scene.add(watchGroup);

    // Layer 1: Caseback
    const caseback = new THREE.Mesh(
      new THREE.CylinderGeometry(1.38, 1.32, 0.14, 48),
      brushedDarkMaterial,
    );
    caseback.position.y = -0.3;
    watchGroup.add(caseback);

    // Layer 2: Main Case Chassis + Lugs (ExtrudeGeometry)
    const caseMidGroup = new THREE.Group();
    const chassis = new THREE.Mesh(
      new THREE.CylinderGeometry(1.48, 1.44, 0.36, 48),
      caseMaterial,
    );
    caseMidGroup.add(chassis);

    const lugShape = new THREE.Shape();
    lugShape.moveTo(-0.15, 0);
    lugShape.lineTo(0.15, 0);
    lugShape.lineTo(0.11, 0.56);
    lugShape.lineTo(-0.11, 0.56);
    lugShape.closePath();
    const lugGeo = new THREE.ExtrudeGeometry(lugShape, {
      depth: 0.18,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.025,
      bevelSegments: 2,
    });
    const lugConfigs: { pos: [number, number, number]; rotX: number; rotY: number }[] = [
      { pos: [-0.74, 0.05, 1.16], rotX: Math.PI / 2 + 0.14, rotY: 0 },
      { pos: [0.74, 0.05, 1.16], rotX: Math.PI / 2 + 0.14, rotY: 0 },
      { pos: [-0.74, 0.05, -1.16], rotX: Math.PI / 2 + 0.14, rotY: Math.PI },
      { pos: [0.74, 0.05, -1.16], rotX: Math.PI / 2 + 0.14, rotY: Math.PI },
    ];
    lugConfigs.forEach(({ pos, rotX, rotY }) => {
      const lug = new THREE.Mesh(lugGeo, caseMaterial);
      lug.rotation.order = 'YXZ';
      lug.position.set(...pos);
      lug.rotation.set(rotX, rotY, 0);
      caseMidGroup.add(lug);
    });

    // Fluted Winding Crown
    const crownGroup = new THREE.Group();
    const crownStem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.25, 16),
      accentMaterial,
    );
    crownStem.rotation.z = Math.PI / 2;
    const crownCap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 0.18, 24),
      caseMaterial,
    );
    crownCap.rotation.z = Math.PI / 2;
    crownCap.position.x = 0.14;
    crownGroup.add(crownStem, crownCap);
    crownGroup.position.set(1.56, 0, 0);
    caseMidGroup.add(crownGroup);
    watchGroup.add(caseMidGroup);

    // Layer 3: Dial & Tourbillon Movement
    const dialLayer = new THREE.Group();
    const dialBase = new THREE.Mesh(
      new THREE.CylinderGeometry(1.28, 1.28, 0.045, 48),
      brushedDarkMaterial,
    );
    dialBase.position.y = 0.16;
    const dialPlate = new THREE.Mesh(new THREE.CircleGeometry(1.275, 48), dialMaterial);
    dialPlate.rotation.x = -Math.PI / 2;
    dialPlate.position.y = 0.184;
    dialLayer.add(dialBase, dialPlate);

    // 12 Hour Batons via InstancedMesh
    const batonGeo = new THREE.BoxGeometry(0.05, 0.04, 0.16);
    const batons = new THREE.InstancedMesh(batonGeo, accentMaterial, 12);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      dummy.position.set(Math.sin(a) * 1.06, 0.205, Math.cos(a) * 1.06);
      dummy.rotation.set(0, a, 0);
      dummy.updateMatrix();
      batons.setMatrixAt(i, dummy.matrix);
    }
    batons.computeBoundingSphere();
    dialLayer.add(batons);

    // Open-Heart Tourbillon Cage & Ruby Jewel
    const tourbillonGroup = new THREE.Group();
    const cageRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.32, 0.035, 12, 32),
      accentMaterial,
    );
    cageRing.rotation.x = Math.PI / 2;
    const bridgeBar = new THREE.Mesh(
      new THREE.BoxGeometry(0.62, 0.03, 0.06),
      caseMaterial,
    );
    const jewel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 0.05, 16),
      rubyMaterial,
    );
    tourbillonGroup.add(cageRing, bridgeBar, jewel);
    tourbillonGroup.position.set(0, 0.21, 0.48);
    dialLayer.add(tourbillonGroup);

    // Hands
    const hourHand = new THREE.Mesh(
      new THREE.BoxGeometry(0.07, 0.025, 0.56),
      accentMaterial,
    );
    hourHand.position.set(0.18, 0.25, -0.14);
    hourHand.rotation.y = -0.8;
    const minuteHand = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.025, 0.88),
      accentMaterial,
    );
    minuteHand.position.set(-0.22, 0.27, -0.26);
    minuteHand.rotation.y = 0.65;
    dialLayer.add(hourHand, minuteHand);
    watchGroup.add(dialLayer);

    // Layer 4: Stepped Bezel (LatheGeometry)
    const bezelProfile = [
      new THREE.Vector2(1.26, 0),
      new THREE.Vector2(1.48, 0),
      new THREE.Vector2(1.44, 0.16),
      new THREE.Vector2(1.3, 0.22),
      new THREE.Vector2(1.26, 0.16),
    ];
    const bezel = new THREE.Mesh(new THREE.LatheGeometry(bezelProfile, 48), caseMaterial);
    bezel.position.y = 0.2;
    watchGroup.add(bezel);

    // Layer 5: Sapphire Crystal Dome
    const crystal = new THREE.Mesh(
      new THREE.CylinderGeometry(1.27, 1.29, 0.07, 48),
      crystalMaterial,
    );
    crystal.renderOrder = 5;
    crystal.position.y = 0.42;
    watchGroup.add(crystal);

    // Ground Pedestal & Soft Contact Shadow
    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(2.1, 2.3, 0.22, 48),
      new THREE.MeshStandardMaterial({ color: 0x14151a, metalness: 0.2, roughness: 0.85 }),
    );
    pedestal.position.y = -1.15;
    watchGroup.add(pedestal);

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
    watchGroup.add(contactShadow);

    applyFinishRef.current = (nextFinish: FinishId) => {
      const cfg = FINISH_CONFIG[nextFinish];
      caseMaterial.color.setHex(cfg.caseColor);
      accentMaterial.color.setHex(cfg.accentColor);
      dialTexture.dispose();
      dialTexture = createDialTexture(cfg.dialBg);
      dialTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      dialMaterial.map = dialTexture;
      dialMaterial.needsUpdate = true;
    };

    // On-demand coalesced rendering + software-WebGL afterDraw pacing
    let frameId = 0;
    let renderBusy = false;
    let renderDirty = false;
    let currentExploded = 0;
    let pointerX = 0;
    let pointerY = 0;
    let lastTime = performance.now();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function requestRender() {
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      frameId = requestAnimationFrame(() => {
        renderDirty = false;
        const now = performance.now();
        const delta = Math.min(0.05, (now - lastTime) / 1000);
        lastTime = now;

        let animating = false;

        // Smooth exploded view damping
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

        caseback.position.y = -0.3 - currentExploded * 0.75;
        dialLayer.position.y = currentExploded * 0.45;
        bezel.position.y = 0.2 + currentExploded * 0.95;
        crystal.position.y = 0.42 + currentExploded * 1.45;
        tourbillonGroup.rotation.y += delta * 0.8;

        // Smooth camera preset damping
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

        // Subtle pointer tilt
        watchGroup.rotation.z = THREE.MathUtils.damp(
          watchGroup.rotation.z,
          -pointerX * 0.08,
          6,
          delta,
        );
        watchGroup.rotation.x = THREE.MathUtils.damp(
          watchGroup.rotation.x,
          pointerY * 0.06,
          6,
          delta,
        );

        controls.update();
        renderer.render(scene, camera);

        const done = () => {
          renderBusy = false;
          if (renderDirty || animating) {
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
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      requestRender();
    };
    window.addEventListener('resize', onResize);

    // Initial render
    requestRender();

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      controls.dispose();
      dialTexture.dispose();
      shadowTex.dispose();
      caseMaterial.dispose();
      accentMaterial.dispose();
      brushedDarkMaterial.dispose();
      rubyMaterial.dispose();
      dialMaterial.dispose();
      crystalMaterial.dispose();
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
        demoName="3D Website Design & Development"
        clientBrand="Chronos Atelier"
        categoryLabel="Service Demo 05"
        onBack={onBack}
        theme="dark"
      />

      {/* Full-viewport 3D Showcase Stage */}
      <div className="relative flex-1 overflow-hidden">
        {/* Isolated WebGL Canvas Mount */}
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
                interactive Calibre 09 Tourbillon model.
              </p>
            </div>
          </div>
        )}

        {/* Top-left minimal editorial title (never covers center subject) */}
        <div className="pointer-events-none relative z-10 max-w-md p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#C6A875]">
            Chronos Atelier · Interactive 3D WebGL
          </p>
          <h1
            className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Calibre 09 Tourbillon
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-neutral-300">
            Drag to orbit 360°, scroll to zoom, or use the dock below to inspect exploded layers and
            metallic finishes.
          </p>
        </div>

        {/* Collapsible Bottom Control Dock (Zero Mid-Screen Occlusion, No backdrop-blur over WebGL) */}
        <div className="fixed bottom-4 left-1/2 z-20 w-[min(1020px,95vw)] -translate-x-1/2">
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
                {/* Exploded View Slider */}
                <div className="lg:col-span-3">
                  <div className="flex justify-between text-[11px] font-semibold text-neutral-300">
                    <label htmlFor="watch-explode">Exploded Assembly</label>
                    <span className="font-mono tabular-nums text-[#C6A875]">{exploded}%</span>
                  </div>
                  <input
                    id="watch-explode"
                    type="range"
                    min={0}
                    max={100}
                    value={exploded}
                    onChange={(e) => setExploded(Number(e.target.value))}
                    className="mt-1.5 w-full accent-[#C6A875]"
                  />
                </div>

                {/* Case Finishes */}
                <div className="lg:col-span-5">
                  <p className="text-[11px] font-semibold text-neutral-300 mb-1.5">Case Finish</p>
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

                {/* Camera Presets */}
                <div className="lg:col-span-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[11px] font-semibold text-neutral-300">Camera Angle</p>
                    <button
                      type="button"
                      onClick={() => {
                        setExploded(0);
                        setFinish('rose-gold');
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
      </div>
    </div>
  );
}
