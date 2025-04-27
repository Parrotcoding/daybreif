/*  service-worker.js  */
const CACHE = 'weather7-v2';          //  <-- bump this on each deploy!
const CORE  = [
  'index.html',
  'app.html',
  'manifest.json',
  // add other assets you want pre-cached
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(c => c.addAll(CORE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp ||
      fetch(event.request).then(net => {
        /* only cache same-origin GETs */
        if (event.request.method === 'GET' &&
            event.request.url.startsWith(self.location.origin)) {
          const copy = net.clone();
          caches.open(CACHE).then(c => c.put(event.request, copy));
        }
        return net;
      })
    )
  );
});
