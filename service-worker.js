var cacheName = "lessons-v5";
var cacheFiles = [
  "webappcw1/public/index.html",
  "webappcw1/src/components/ParentComponent.vue",
  "webappcw1/src/components/LessonComponent.vue",
  "webappcw1/src/components/CheckoutComponent.vue",
  "webappcw1/manifest.json",
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
