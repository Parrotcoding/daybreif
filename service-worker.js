// Minimal Service Worker for PWA installability
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// No fetch handler needed for bare installability, but you can add caching here.
