import './i18n';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CachedApiProvider } from './components/providers/CachedApiProvider';
import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { registerServiceWorker } from './utils/serviceWorker';
import { observeWebVitals, reportPerformance } from './utils/performance';
import { setupResourceHints } from './utils/preload';
import { disableConsoleInProduction } from './utils/logger';
import { fetchNavItems } from './api/http/navbar.http';
import { homeApi } from './api/http/home.http';
import { cacheManager } from './utils/cacheManager';

// Disable console logs in production
disableConsoleInProduction();

const queryClient = new QueryClient();

// Performance monitoring
observeWebVitals((metrics) => {
  reportPerformance(metrics);
});

// Resource hints for performance
setupResourceHints();

// Prefetch critical data
const prefetchData = async () => {
  const locale = localStorage.getItem('locale') || 'en';
  const { prefetchService } = await import('./services/prefetchService');

  // Parallel prefetch using the new service
  await Promise.all([
    prefetchService.prefetchNavbar(locale),
    prefetchService.prefetchHomeNews(),
    prefetchService.prefetchFaculties(),
    prefetchService.prefetchNewsPage()
  ]);
};
prefetchData();

// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-out',
  once: true,
  offset: 100,
});

// Service Worker registration
if (process.env.NODE_ENV === 'production') {
  registerServiceWorker();
}

const rootElement = document.getElementById('root') as HTMLElement;
const app = (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CachedApiProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CachedApiProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(app);
}