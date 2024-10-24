!(function () {
  "use strict";
  const e = globalThis.browser,
    r = globalThis.document;
  if (r instanceof globalThis.Document && e && e.runtime && e.runtime.getURL) {
    const a = r.createElement("script");
    (a.src = e.runtime.getURL("/lib/single-file-hooks-frames.js")),
      (a.async = !1),
      (r.documentElement || r).appendChild(a),
      a.remove();
  }
  let a = new Map();
  browser.runtime.onMessage.addListener((e) =>
    "singlefile.fetchFrame" == e.method &&
    window.frameId &&
    window.frameId == e.frameId
      ? (async function (e) {
          try {
            const t = await ((r = e.url),
            (a = {
              cache: "force-cache",
              headers: e.headers,
              referrerPolicy: "strict-origin-when-cross-origin",
            }),
            window.fetch(r, a));
            return {
              status: t.status,
              headers: [...t.headers],
              array: Array.from(new Uint8Array(await t.arrayBuffer())),
            };
          } catch (e) {
            return { error: e && e.toString() };
          }
          var r, a;
        })(e)
      : "singlefile.fetchResponse" == e.method
      ? (async function (e) {
          const r = a.get(e.requestId);
          r &&
            (e.error
              ? (r.reject(new Error(e.error)), a.delete(e.requestId))
              : (e.truncated &&
                  (r.array
                    ? (r.array = r.array.concat(e.array))
                    : ((r.array = e.array), a.set(e.requestId, r)),
                  e.finished && (e.array = r.array)),
                (e.truncated && !e.finished) ||
                  (r.resolve({
                    status: e.status,
                    headers: { get: (r) => e.headers && e.headers[r] },
                    arrayBuffer: async () => new Uint8Array(e.array).buffer,
                  }),
                  a.delete(e.requestId))));
          return {};
        })(e)
      : void 0,
  );
})();
