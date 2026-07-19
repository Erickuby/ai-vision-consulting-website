import { renderToString } from 'react-dom/server';
import { App } from './App';
import { getSiteRoute, routeCanonical, siteRoutes, SITE_URL, type SiteRoute } from './data/routes';
import './index.css';

export function render(pathname: string) {
  return renderToString(<App pathname={pathname} />);
}

export { getSiteRoute, routeCanonical, siteRoutes, SITE_URL };
export type { SiteRoute };
