if (!self.define) {
  let e,
    s = {};
  const r = (r, i) => (
    (r = new URL(r + ".js", i).href),
    s[r] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = r), (e.onload = s), document.head.appendChild(e);
        } else (e = r), importScripts(r), s();
      }).then(() => {
        let e = s[r];
        if (!e) throw new Error(`Module ${r} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, n) => {
    const c =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[c]) return;
    let o = {};
    const t = (e) => r(e, c),
      l = { module: { uri: c }, exports: o, require: t };
    s[c] = Promise.all(i.map((e) => l[e] || t(e))).then((e) => (n(...e), o));
  };
}
define(["./workbox-6567b62a"], function (e) {
  "use strict";
  e.setCacheNameDetails({ prefix: "webappcw1" }),
    self.addEventListener("message", (e) => {
      e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
    }),
    e.precacheAndRoute(
      [
        { url: "/webappcw1/css/app.65130490.css", revision: null },
        {
          url: "/webappcw1/index.html",
          revision: "4105c87674e48aa8d378dfce15579519",
        },
        { url: "/webappcw1/js/app.48ae7b25.js", revision: null },
        { url: "/webappcw1/js/chunk-vendors.fffa1c70.js", revision: null },
        {
          url: "/webappcw1/manifest.json",
          revision: "844794f7a7c24e53f4dc228f1d531b84",
        },
        {
          url: "/webappcw1/robots.txt",
          revision: "b6216d61c03e6ce0c9aea6ca7808f7ca",
        },
      ],
      {}
    );
});
//# sourceMappingURL=service-worker.js.map
