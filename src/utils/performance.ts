/**
 * Performance Monitoring Utilities
 * Web Vitals va performance metrics
 */

// Web Vitals metrics
export interface WebVitalsMetrics {
  cls: number; // Cumulative Layout Shift
  fid: number; // First Input Delay
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  ttfb: number; // Time to First Byte
}

// Performance observer for Web Vitals
export const observeWebVitals = (callback: (metric: WebVitalsMetrics) => void) => {
  const metrics: Partial<WebVitalsMetrics> = {};

  // CLS - Cumulative Layout Shift
  if ('PerformanceObserver' in window) {
    try {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            metrics.cls = (metrics.cls || 0) + (entry as any).value;
          }
        }
        callback(metrics as WebVitalsMetrics);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS observation not supported');
    }

    // FID - First Input Delay
    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          metrics.fid = (entry as any).processingStart - entry.startTime;
          callback(metrics as WebVitalsMetrics);
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID observation not supported');
    }

    // LCP - Largest Contentful Paint
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        metrics.lcp = lastEntry.startTime;
        callback(metrics as WebVitalsMetrics);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP observation not supported');
    }
  }

  // FCP - First Contentful Paint
  if ('PerformancePaintTiming' in window) {
    try {
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            metrics.fcp = entry.startTime;
            callback(metrics as WebVitalsMetrics);
          }
        }
      });
      paintObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
      console.warn('FCP observation not supported');
    }
  }

  // TTFB - Time to First Byte
  if ('PerformanceNavigationTiming' in window) {
    try {
      const navigationObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
            callback(metrics as WebVitalsMetrics);
          }
        }
      });
      navigationObserver.observe({ entryTypes: ['navigation'] });
    } catch (e) {
      console.warn('TTFB observation not supported');
    }
  }
};

// Resource loading performance
export const measureResourceTiming = () => {
  if ('PerformanceObserver' in window) {
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const resourceEntry = entry as PerformanceResourceTiming;
        console.log(`Resource: ${resourceEntry.name}`);
        console.log(`Load time: ${resourceEntry.responseEnd - resourceEntry.requestStart}ms`);
      }
    });
    resourceObserver.observe({ entryTypes: ['resource'] });
  }
};

// Bundle size monitoring
export const getBundleSize = (): number => {
  // Bu development da ishlamaydi, production build da foydalanish kerak
  if (process.env.NODE_ENV === 'production') {
    // Webpack inject qilgan o'zgaruvchi
    return (window as any).__bundle_size__ || 0;
  }
  return 0;
};

// Memory usage monitoring
export const getMemoryUsage = () => {
  if ('memory' in performance) {
    const memInfo = (performance as any).memory;
    return {
      used: Math.round(memInfo.usedJSHeapSize / 1048576), // MB
      total: Math.round(memInfo.totalJSHeapSize / 1048576), // MB
      limit: Math.round(memInfo.jsHeapSizeLimit / 1048576), // MB
    };
  }
  return null;
};

// Network information
export const getNetworkInfo = () => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    return {
      effectiveType: connection.effectiveType, // 'slow-2g', '2g', '3g', '4g'
      downlink: connection.downlink, // Mbps
      rtt: connection.rtt, // ms
      saveData: connection.saveData, // boolean
    };
  }
  return null;
};

// Performance budget checking
export const checkPerformanceBudget = (metrics: WebVitalsMetrics) => {
  const budgets = {
    cls: 0.1, // Good: < 0.1, Poor: > 0.25
    fid: 100, // Good: < 100ms, Poor: > 300ms
    fcp: 1800, // Good: < 1.8s, Poor: > 3s
    lcp: 2500, // Good: < 2.5s, Poor: > 4s
    ttfb: 800, // Good: < 0.8s
  };

  const results = {
    cls: metrics.cls <= budgets.cls ? 'good' : metrics.cls <= 0.25 ? 'needs-improvement' : 'poor',
    fid: metrics.fid <= budgets.fid ? 'good' : metrics.fid <= 300 ? 'needs-improvement' : 'poor',
    fcp: metrics.fcp <= budgets.fcp ? 'good' : metrics.fcp <= 3000 ? 'needs-improvement' : 'poor',
    lcp: metrics.lcp <= budgets.lcp ? 'good' : metrics.lcp <= 4000 ? 'needs-improvement' : 'poor',
    ttfb: metrics.ttfb <= budgets.ttfb ? 'good' : 'poor',
  };

  return results;
};

// Report performance metrics
export const reportPerformance = (metrics: WebVitalsMetrics) => {
  const budgetResults = checkPerformanceBudget(metrics);

  console.group('🚀 Performance Metrics');
  console.log(`CLS: ${metrics.cls?.toFixed(3)} (${budgetResults.cls})`);
  console.log(`FID: ${metrics.fid?.toFixed(0)}ms (${budgetResults.fid})`);
  console.log(`FCP: ${metrics.fcp?.toFixed(0)}ms (${budgetResults.fcp})`);
  console.log(`LCP: ${metrics.lcp?.toFixed(0)}ms (${budgetResults.lcp})`);
  console.log(`TTFB: ${metrics.ttfb?.toFixed(0)}ms (${budgetResults.ttfb})`);

  const memory = getMemoryUsage();
  if (memory) {
    console.log(`Memory: ${memory.used}MB / ${memory.total}MB`);
  }

  const network = getNetworkInfo();
  if (network) {
    console.log(`Network: ${network.effectiveType}, ${network.downlink}Mbps`);
  }
  console.groupEnd();

  // Send to analytics if needed
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: 'Performance Metrics',
      value: Math.round(metrics.lcp || 0),
      custom_map: {
        cls: metrics.cls,
        fid: metrics.fid,
        fcp: metrics.fcp,
        lcp: metrics.lcp,
        ttfb: metrics.ttfb,
      },
    });
  }
};