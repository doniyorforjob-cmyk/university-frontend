import './i18n';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerServiceWorker } from './utils/serviceWorker';
import { observeWebVitals, reportPerformance } from './utils/performance';
import { setupResourceHints } from './utils/preload';

const queryClient = new QueryClient();

// Performance monitoring
observeWebVitals((metrics) => {
  reportPerformance(metrics);
});

// Resource hints for performance
setupResourceHints();

// Service Worker registration
if (process.env.NODE_ENV === 'production') {
  registerServiceWorker();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);