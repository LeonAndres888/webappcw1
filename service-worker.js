if (!self.define) {
  let e,
    s = {};
  const r = (r, c) => (
    (r = new URL(r + ".js", c).href),
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
  self.define = (c, i) => {
    const n =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[n]) return;
    let o = {};
    const t = (e) => r(e, n),
      l = { module: { uri: n }, exports: o, require: t };
    s[n] = Promise.all(c.map((e) => l[e] || t(e))).then((e) => (i(...e), o));
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
          revision: "b12229703ec4fad9210e06380242476d",
        },
        { url: "/webappcw1/js/app.d99bd5cd.js", revision: null },
        { url: "/webappcw1/js/chunk-vendors.fffa1c70.js", revision: null },
        {
          url: "/webappcw1/manifest.json",
          revision: "2b4668d13c1e3e61fddcf7e4ba97bc27",
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
