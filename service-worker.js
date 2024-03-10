// Incrementing CACHE_VERSION will kick off the install event and force previously cached
// resources to be cached again.
const CACHE_VERSION = 2;
const CURRENT_CACHES = {
  prefetch: "prefetch-cache-v" + CACHE_VERSION,
};

const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/manifest.json",
  "/images/english.png",
  "/images/math.png",
  "/images/music.png",
  // Add other URLs you want to cache
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CURRENT_CACHES.prefetch).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  const expectedCacheNames = Object.values(CURRENT_CACHES);

  // Active service worker takes control of the page as soon as it's in waiting
  // This will remove any old versions of the cache
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!expectedCacheNames.includes(cacheName)) {
              console.log("Deleting out of date cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CURRENT_CACHES.prefetch).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    })
  );
});
