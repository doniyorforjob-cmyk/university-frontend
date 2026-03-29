/**
 * Service Worker for caching and offline functionality
 * PWA features va performance optimization
 */

const CACHE_NAME = 'university-frontend-v11';
const STATIC_CACHE = 'static-v11';
const DYNAMIC_CACHE = 'dynamic-v11';

// Static assets to cache immediately (only essential root files)
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /\/api\/footer/,
  /\/api\/navbar/,
  /\/api\/stats/,
  /\/api\/structure/,
  /\/api\/posts/,
  /\/api\/sections/,
  /\/api\/content/,
];

// Install event - cache static assets
self.addEventListener('install', (event) => {

  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {

        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error('Failed to cache static assets:', error);
      })
  );
  // Force activation
  self.skipWaiting();
});

// Activate event - clean ALL old caches including previous versions
self.addEventListener('activate', (event) => {

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete ANY cache that is not the current version
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE && cacheName !== CACHE_NAME) {
            console.log('SW: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('SW: Activated version v11. Claiming clients.');
      // Take control of all clients immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external requests (except images from CDN)
  if (!url.origin.includes(self.location.origin) &&
    !url.hostname.includes('cdn') &&
    !url.hostname.includes('img')) return;

  // Handle API requests
  if (API_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname))) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // Handle static assets
  if (STATIC_ASSETS.some(asset => url.pathname.endsWith(asset))) {
    event.respondWith(handleStaticRequest(request));
    return;
  }

  // Handle images
  if (request.destination === 'image') {
    event.respondWith(handleImageRequest(request));
    return;
  }

  // Handle JS/CSS chunks - Network First to prevent ChunkLoadError after deploy
  if (request.destination === 'script' || request.destination === 'style') {
    event.respondWith(handleDynamicRequest(request));
    return;
  }

  // Handle documents (HTML) - Network First to prevent ChunkLoadError from stale index.html
  if (request.destination === 'document') {
    event.respondWith(handleDynamicRequest(request));
    return;
  }
});

// Handle API requests - Network First with cache fallback
async function handleApiRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);

    // If response is valid (including 4xx/5xx), return it
    // We only cache successful 200 responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {

  }

  // Fallback to cache (only on network failure/offline)
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  // Return offline response
  return new Response(JSON.stringify({
    error: 'Offline mode',
    message: 'Internet ulanishi yo\'q'
  }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' }
  });
}

// Handle static assets - Cache First
async function handleStaticRequest(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Failed to fetch static asset:', error);
    return new Response('Asset not available', { status: 404 });
  }
}

// Handle images - Cache First with size limit
async function handleImageRequest(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Only cache small images to avoid storage quota issues
      const contentLength = networkResponse.headers.get('content-length');
      if (contentLength && parseInt(contentLength) < 1024 * 1024) { // 1MB limit
        const cache = await caches.open(DYNAMIC_CACHE);
        cache.put(request, networkResponse.clone());
      }
    }
    return networkResponse;
  } catch (error) {
    console.error('Failed to fetch image:', error);
    return new Response('Image not available', { status: 404 });
  }
}

// Handle dynamic content - Network First
async function handleDynamicRequest(request) {
  try {
    const networkResponse = await fetch(request);

    // Check if we received an HTML response for a script/style request
    // This happens when the server returns index.html for a missing chunk (404 fallback)
    const contentType = networkResponse.headers.get('content-type');
    if (
      networkResponse.ok &&
      contentType &&
      contentType.includes('text/html') &&
      (request.destination === 'script' || request.destination === 'style')
    ) {
      // Treat this as a failure to trigger ChunkLoadError logic in the app
      console.error('SW: Received HTML instead of script/style. Triggering reload logic.');
      throw new Error('ChunkLoadError: Missing asset (Server returned HTML)');
    }

    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    // If it's a script/style and we reach here, it's a critical load failure
    throw error;
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {

  // Implement offline action sync here
}

// Push notifications (optional)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/logo192.png',
      badge: '/logo192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});

// Periodic background fetch (experimental)
if ('periodicSync' in self.registration) {
  self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'content-sync') {
      event.waitUntil(syncContent());
    }
  });
}

async function syncContent() {

  // Update cached content periodically
}