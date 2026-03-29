/**
 * Service Worker Registration and Management
 */

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('SW registered successfully:', registration.scope);

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available
              showUpdateNotification();
            }
          });
        }
      });

      // Listen for messages from SW
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('Message from SW:', event.data);
      });

      return registration;
    } catch (error) {
      console.error('SW registration failed:', error);
      return null;
    }
  } else {
    console.warn('Service Worker not supported');
    return null;
  }
};

export const unregisterServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.unregister();
      console.log('SW unregistered');
    } catch (error) {
      console.error('SW unregistration failed:', error);
    }
  }
};

const showUpdateNotification = () => {
  // Create update notification
  const updateBanner = document.createElement('div');
  updateBanner.id = 'sw-update-banner';
  updateBanner.className = 'fixed top-0 left-0 right-0 bg-primary text-white p-4 z-50 shadow-lg';
  updateBanner.innerHTML = `
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        <span>Yangi versiya mavjud!</span>
      </div>
      <div class="flex space-x-2">
        <button id="update-dismiss" class="text-white/80 hover:text-white text-sm underline">
          Keyinroq
        </button>
        <button id="update-refresh" class="bg-white text-primary px-3 py-1 rounded text-sm font-medium hover:bg-gray-100">
          Yangilash
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(updateBanner);

  // Handle buttons
  document.getElementById('update-dismiss')?.addEventListener('click', () => {
    updateBanner.remove();
  });

  document.getElementById('update-refresh')?.addEventListener('click', () => {
    window.location.reload();
  });
};

// Check if app is online
export const isOnline = (): boolean => {
  return navigator.onLine;
};

// Listen for online/offline events
export const setupNetworkListeners = (callbacks: {
  onOnline?: () => void;
  onOffline?: () => void;
}) => {
  window.addEventListener('online', () => {
    console.log('App is online');
    callbacks.onOnline?.();
  });

  window.addEventListener('offline', () => {
    console.log('App is offline');
    callbacks.onOffline?.();
  });
};

// Send message to service worker
export const sendMessageToSW = (message: any) => {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(message);
  }
};

// Request sync
export const requestSync = (tag: string) => {
  if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    navigator.serviceWorker.ready.then((registration) => {
      (registration as any).sync.register(tag);
    });
  }
};

// Check storage quota
export const checkStorageQuota = async () => {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    try {
      const estimate = await navigator.storage.estimate();
      return {
        quota: estimate.quota,
        usage: estimate.usage,
        usageDetails: (estimate as any).usageDetails,
      };
    } catch (error) {
      console.error('Storage estimate failed:', error);
    }
  }
  return null;
};