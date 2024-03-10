const cacheName = "lessons-v1";
const cacheFiles = [
  "index.html",
  "styles.css",
  "script.js",
  "manifest.json",
  "/images/english.png",
  "/images/math.png",
  "/images/music.png",
  // Add other URLs you want to cache, ensure they're relative to the root of your domain
];

self.addEventListener("install", function (e) {
  console.log("[Service Worker] Install");
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log("[Service Worker] Caching files");
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener("fetch", function (e) {
  e.respondWith(
    // Try the cache first
    caches.match(e.request).then(function (response) {
      // Return response from cache if available
      if (response) {
        console.log("[Service Worker] Found in cache", e.request.url);
        return response;
      }

      // Otherwise fetch from the network
      return fetch(e.request).then(function (response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // IMPORTANT: Clone the response. A response is a stream and because we want the browser
        // to consume the response as well as the cache to consume the response, we need to clone it
        // so we have two streams.
        const responseToCache = response.clone();

        // Cache the fetched response dynamically
        caches.open(cacheName).then(function (cache) {
          console.log("[Service Worker] Caching new resource", e.request.url);
          cache.put(e.request, responseToCache);
        });

        return response;
      });
    })
  );
});

self.addEventListener("activate", function (e) {
  console.log("[Service Worker] Activate");
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // Remove any old versions of the cache
      return Promise.all(
        keyList.map(function (key) {
          if (key !== cacheName) {
            console.log("[Service Worker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  // Claim any clients immediately, so that the service worker starts controlling them
  // without requiring a reload of the page.
  return self.clients.claim();
});
