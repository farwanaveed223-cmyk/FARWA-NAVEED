import { useEffect, useState } from 'react';
import { AgencyHome } from './components/AgencyHome';
import { PortfolioDashboardDemo } from './demos/business/PortfolioDashboardDemo';
import { CrmDemo } from './demos/business/CrmDemo';
import { SupportDemo } from './demos/business/SupportDemo';
import { TeamDemo } from './demos/business/TeamDemo';
import { HrDemo } from './demos/business/HrDemo';
import { FinanceLegalDemo } from './demos/business/FinanceLegalDemo';
import { InventoryDemo } from './demos/business/InventoryDemo';
import { MarketingDemo } from './demos/business/MarketingDemo';
import { EducationDemo } from './demos/business/EducationDemo';
import { RestaurantDemo } from './demos/business/RestaurantDemo';
import { ServiceBusinessDemo } from './demos/services/ServiceBusinessDemo';
import { ServiceLandingDemo } from './demos/services/ServiceLandingDemo';
import { ServicePortfolioDemo } from './demos/services/ServicePortfolioDemo';
import { ServiceRedesignDemo } from './demos/services/ServiceRedesignDemo';
import { Service3dDemo } from './demos/services/Service3dDemo';

function parseDemoRoute(hash: string): string | null {
  if (hash.startsWith('#/demo/')) {
    return hash.slice('#/demo/'.length).replace(/\/+$/, '');
  }
  return null;
}

export default function App() {
  const [activeDemo, setActiveDemo] = useState<string | null>(() =>
    typeof window !== 'undefined' ? parseDemoRoute(window.location.hash) : null,
  );

  useEffect(() => {
    const onHashChange = () => {
      const demo = parseDemoRoute(window.location.hash);
      setActiveDemo(demo);
      if (demo) {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const openDemo = (route: string) => {
    window.location.hash = route;
    const slug = parseDemoRoute(route);
    setActiveDemo(slug);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const backToAgency = () => {
    window.location.hash = '';
    setActiveDemo(null);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  switch (activeDemo) {
    // Part 1: 10 Business Solution Demos
    case 'portfolio-dashboard':
      return <PortfolioDashboardDemo onBack={backToAgency} />;
    case 'crm':
      return <CrmDemo onBack={backToAgency} />;
    case 'support':
      return <SupportDemo onBack={backToAgency} />;
    case 'team':
      return <TeamDemo onBack={backToAgency} />;
    case 'hr':
      return <HrDemo onBack={backToAgency} />;
    case 'finance-legal':
      return <FinanceLegalDemo onBack={backToAgency} />;
    case 'inventory':
      return <InventoryDemo onBack={backToAgency} />;
    case 'marketing':
      return <MarketingDemo onBack={backToAgency} />;
    case 'education':
      return <EducationDemo onBack={backToAgency} />;
    case 'restaurant':
      return <RestaurantDemo onBack={backToAgency} />;

    // Part 2: 5 Website Service Demos
    case 'business':
      return <ServiceBusinessDemo onBack={backToAgency} />;
    case 'landing':
      return <ServiceLandingDemo onBack={backToAgency} />;
    case 'portfolio':
      return <ServicePortfolioDemo onBack={backToAgency} />;
    case 'redesign':
      return <ServiceRedesignDemo onBack={backToAgency} />;
    case '3d':
      return <Service3dDemo onBack={backToAgency} />;

    default:
      return <AgencyHome onOpenDemo={openDemo} />;
  }
}
