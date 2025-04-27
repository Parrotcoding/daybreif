// Minimal service worker to satisfy PWA installability
self.addEventListener('install', event => {
  // Activate immediately
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  // Take control of open pages
  event.waitUntil(self.clients.claim());
});

// (Optional) Cache assets for offline support
self.addEventListener('fetch', event => {
  // You can add caching logic here if desired
});
