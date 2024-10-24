!(function () {
  "use strict";
  ((e) => {
    const t = "single-file-lazy-load",
      n = "single-file-load-image",
      i = "single-file-request-get-adopted-stylesheets",
      r = {
        family: "font-family",
        style: "font-style",
        weight: "font-weight",
        stretch: "font-stretch",
        unicodeRange: "unicode-range",
        variant: "font-variant",
        featureSettings: "font-feature-settings",
      },
      o = e.CustomEvent,
      l = e.document,
      s = e.screen,
      d = e.Element,
      a = e.UIEvent,
      c = e.Event,
      g = e.FileReader,
      f = e.Blob,
      _ = e.JSON,
      m = e.MutationObserver,
      u = e.URL,
      h = new Map(),
      p = new Map();
    let y;
    function E() {
      l.addEventListener("single-file-load-deferred-images-start", () => v()),
        l.addEventListener(
          "single-file-load-deferred-images-keep-zoom-level-start",
          () => v(!0),
        ),
        l.addEventListener("single-file-load-deferred-images-end", () => w()),
        l.addEventListener(
          "single-file-load-deferred-images-keep-zoom-level-end",
          () => w(!0),
        ),
        l.addEventListener("single-file-load-deferred-images-reset", F),
        l.addEventListener(
          "single-file-load-deferred-images-keep-zoom-level-reset",
          () => {
            const e = l.documentElement.style.getPropertyValue("-sf-transform"),
              t = l.documentElement.style.getPropertyPriority("-sf-transform"),
              n = l.documentElement.style.getPropertyValue(
                "-sf-transform-origin",
              ),
              i = l.documentElement.style.getPropertyPriority(
                "-sf-transform-origin",
              ),
              r = l.documentElement.style.getPropertyValue("-sf-min-height"),
              o = l.documentElement.style.getPropertyPriority("-sf-min-height");
            l.documentElement.style.setProperty("transform", e, t),
              l.documentElement.style.setProperty("transform-origin", n, i),
              l.documentElement.style.setProperty("min-height", r, o),
              l.documentElement.style.removeProperty("-sf-transform"),
              l.documentElement.style.removeProperty("-sf-transform-origin"),
              l.documentElement.style.removeProperty("-sf-min-height"),
              F();
          },
        ),
        l.addEventListener("single-file-dispatch-scroll-event-start", () => {
          y = !0;
        }),
        l.addEventListener("single-file-dispatch-scroll-event-end", () => {
          y = !1;
        }),
        l.addEventListener("single-file-block-cookies-start", () => {
          try {
            l.__defineGetter__("cookie", () => {
              throw new Error(
                "document.cookie temporary blocked by SingleFile",
              );
            });
          } catch (e) {}
        }),
        l.addEventListener("single-file-block-cookies-end", () => {
          delete l.cookie;
        }),
        l.addEventListener("single-file-block-storage-start", () => {
          e._singleFile_localStorage ||
            ((e._singleFile_localStorage = e.localStorage),
            e.__defineGetter__("localStorage", () => {
              throw new Error("localStorage temporary blocked by SingleFile");
            })),
            e._singleFile_indexedDB ||
              ((e._singleFile_indexedDB = e.indexedDB),
              e.__defineGetter__("indexedDB", () => {
                throw new Error("indexedDB temporary blocked by SingleFile");
              }));
        }),
        l.addEventListener("single-file-block-storage-end", () => {
          e._singleFile_localStorage &&
            (delete e.localStorage,
            (e.localStorage = e._singleFile_localStorage),
            delete e._singleFile_localStorage),
            e._singleFile_indexedDB ||
              (delete e.indexedDB,
              (e.indexedDB = e._singleFile_indexedDB),
              delete e._singleFile_indexedDB);
        }),
        l.addEventListener("single-file-request-fetch-supported", () =>
          l.dispatchEvent(new o("single-file-response-fetch-supported")),
        ),
        l.addEventListener("single-file-request-fetch", async (t) => {
          const { url: n, options: i } = _.parse(t.detail);
          let r;
          try {
            const t = await ((t, n) => e.fetch(t, n))(n, i);
            r = {
              url: n,
              response: await t.arrayBuffer(),
              headers: [...t.headers],
              status: t.status,
            };
          } catch (e) {
            r = { url: n, error: e && e.toString() };
          }
          l.dispatchEvent(new o("single-file-response-fetch", { detail: r }));
        }),
        l.addEventListener(i, S),
        l.addEventListener("single-file-bootstrap", (t) => {
          try {
            e.bootstrap && t.detail.data && e.bootstrap(t.detail.data);
          } catch (e) {}
        });
    }
    function v(i) {
      const r = l.scrollingElement || l.documentElement,
        a = r.clientHeight,
        g = r.clientWidth,
        f = Math.max(r.scrollHeight - a, a),
        _ = Math.max(r.scrollWidth - g, g);
      if (
        (l.querySelectorAll("[loading=lazy]").forEach((e) => {
          (e.loading = "eager"), e.setAttribute(t, "");
        }),
        r.__defineGetter__("clientHeight", () => f),
        r.__defineGetter__("clientWidth", () => _),
        s.__defineGetter__("height", () => f),
        s.__defineGetter__("width", () => _),
        (e._singleFile_innerHeight = e.innerHeight),
        (e._singleFile_innerWidth = e.innerWidth),
        e.__defineGetter__("innerHeight", () => f),
        e.__defineGetter__("innerWidth", () => _),
        i ||
          e._singleFile_getBoundingClientRect ||
          ((e._singleFile_getBoundingClientRect =
            d.prototype.getBoundingClientRect),
          (d.prototype.getBoundingClientRect = function () {
            const t = e._singleFile_getBoundingClientRect.call(this);
            return (
              this == r &&
                (t.__defineGetter__("height", () => f),
                t.__defineGetter__("bottom", () => f + t.top),
                t.__defineGetter__("width", () => _),
                t.__defineGetter__("right", () => _ + t.left)),
              t
            );
          })),
        !e._singleFileImage)
      ) {
        const t = e.Image;
        (e._singleFileImage = e.Image),
          e.__defineGetter__("Image", function () {
            return function () {
              const e = new t(...arguments),
                i = new t(...arguments);
              return (
                i.__defineSetter__("src", (t) => {
                  (e.src = t), l.dispatchEvent(new o(n, { detail: e.src }));
                }),
                i.__defineGetter__("src", () => e.src),
                i.__defineSetter__("srcset", (t) => {
                  l.dispatchEvent(new o(n)), (e.srcset = t);
                }),
                i.__defineGetter__("srcset", () => e.srcset),
                i.__defineGetter__("height", () => e.height),
                i.__defineGetter__("width", () => e.width),
                i.__defineGetter__("naturalHeight", () => e.naturalHeight),
                i.__defineGetter__("naturalWidth", () => e.naturalWidth),
                e.decode &&
                  i.__defineGetter__("decode", () => () => e.decode()),
                (e.onload =
                  e.onloadend =
                  e.onerror =
                    (t) => {
                      l.dispatchEvent(
                        new o("single-file-image-loaded", { detail: e.src }),
                      ),
                        i.dispatchEvent(new c(t.type, t));
                    }),
                i
              );
            };
          });
      }
      let m, u;
      i
        ? ((m = a / f), (u = g / _))
        : ((m = (a + e.scrollY) / f), (u = (g + e.scrollX) / _));
      const y = Math.min(m, u);
      if (y < 1) {
        const e = l.documentElement.style.getPropertyValue("transform"),
          t = l.documentElement.style.getPropertyPriority("transform"),
          n = l.documentElement.style.getPropertyValue("transform-origin"),
          r = l.documentElement.style.getPropertyPriority("transform-origin"),
          o = l.documentElement.style.getPropertyValue("min-height"),
          s = l.documentElement.style.getPropertyPriority("min-height");
        l.documentElement.style.setProperty(
          "transform-origin",
          (m < 1 ? "50%" : "0") + " " + (u < 1 ? "50%" : "0") + " 0",
          "important",
        ),
          l.documentElement.style.setProperty(
            "transform",
            "scale3d(" + y + ", " + y + ", 1)",
            "important",
          ),
          l.documentElement.style.setProperty(
            "min-height",
            100 / y + "vh",
            "important",
          ),
          P(),
          i
            ? (l.documentElement.style.setProperty("-sf-transform", e, t),
              l.documentElement.style.setProperty("-sf-transform-origin", n, r),
              l.documentElement.style.setProperty("-sf-min-height", o, s))
            : (l.documentElement.style.setProperty("transform", e, t),
              l.documentElement.style.setProperty("transform-origin", n, r),
              l.documentElement.style.setProperty("min-height", o, s));
      }
      if (!i) {
        P();
        const e = r.getBoundingClientRect();
        window == window.top &&
          [...h].forEach(([t, n]) => {
            const i =
                n.options &&
                n.options.root &&
                n.options.root.getBoundingClientRect,
              r = i && n.options.root.getBoundingClientRect(),
              o = p.get(t);
            if (o) {
              const l = o.map((t) => {
                const n = t.getBoundingClientRect();
                return {
                  target: t,
                  intersectionRatio: 1,
                  boundingClientRect: n,
                  intersectionRect: n,
                  isIntersecting: !0,
                  rootBounds: i ? r : e,
                  time: 0,
                };
              });
              n.callback.call(t, l, t);
            }
          });
      }
    }
    function w(n) {
      l.querySelectorAll("[" + t + "]").forEach((e) => {
        (e.loading = "lazy"), e.removeAttribute(t);
      }),
        n ||
          (e._singleFile_getBoundingClientRect &&
            ((d.prototype.getBoundingClientRect =
              e._singleFile_getBoundingClientRect),
            delete e._singleFile_getBoundingClientRect)),
        e._singleFileImage &&
          (delete e.Image,
          (e.Image = e._singleFileImage),
          delete e._singleFileImage),
        n || P();
    }
    function F() {
      const t = l.scrollingElement || l.documentElement;
      null != e._singleFile_innerHeight &&
        (delete e.innerHeight,
        (e.innerHeight = e._singleFile_innerHeight),
        delete e._singleFile_innerHeight),
        null != e._singleFile_innerWidth &&
          (delete e.innerWidth,
          (e.innerWidth = e._singleFile_innerWidth),
          delete e._singleFile_innerWidth),
        delete t.clientHeight,
        delete t.clientWidth,
        delete s.height,
        delete s.width;
    }
    if (
      (E(),
      new m(E).observe(l, { childList: !0 }),
      e.CSS && e.CSS.paintWorklet && e.CSS.paintWorklet.addModule)
    ) {
      const t = e.CSS.paintWorklet.addModule;
      e.CSS.paintWorklet.addModule = function (n, i) {
        const r = t.apply(e.CSS.paintWorklet, arguments);
        return (
          (n = new u(n, l.baseURI).href),
          l.dispatchEvent(
            new o("single-file-new-worklet", {
              detail: { moduleURL: n, options: i },
            }),
          ),
          r
        );
      };
    }
    if (e.FontFace) {
      const t = e.FontFace;
      (e.FontFace = function () {
        return (
          b(...arguments).then((e) =>
            l.dispatchEvent(new o("single-file-new-font-face", { detail: e })),
          ),
          new t(...arguments)
        );
      }),
        (e.FontFace.prototype = t.prototype),
        (e.FontFace.toString = function () {
          return "function FontFace() { [native code] }";
        });
      const n = l.fonts.delete;
      (l.fonts.delete = function (e) {
        return (
          b(e.family).then((e) =>
            l.dispatchEvent(new o("single-file-delete-font", { detail: e })),
          ),
          n.call(l.fonts, e)
        );
      }),
        (l.fonts.delete.toString = function () {
          return "function delete() { [native code] }";
        });
      const i = l.fonts.clear;
      (l.fonts.clear = function () {
        return (
          l.dispatchEvent(new o("single-file-clear-fonts")), i.call(l.fonts)
        );
      }),
        (l.fonts.clear.toString = function () {
          return "function clear() { [native code] }";
        });
    }
    if (e.IntersectionObserver) {
      const t = e.IntersectionObserver;
      (e.IntersectionObserver = function () {
        const e = new t(...arguments),
          n = t.prototype.observe || e.observe,
          i = t.prototype.unobserve || e.unobserve,
          r = arguments[0],
          o = arguments[1];
        return (
          n &&
            (e.observe = function (t) {
              let i = p.get(e);
              return i || ((i = []), p.set(e, i)), i.push(t), n.call(e, t);
            }),
          i &&
            (e.unobserve = function (t) {
              let n = p.get(e);
              return (
                n &&
                  ((n = n.filter((e) => e != t)),
                  n.length ? p.set(e, n) : (p.delete(e), h.delete(e))),
                i.call(e, t)
              );
            }),
          h.set(e, { callback: r, options: o }),
          e
        );
      }),
        (e.IntersectionObserver.prototype = t.prototype),
        (e.IntersectionObserver.toString = function () {
          return "function IntersectionObserver() { [native code] }";
        });
    }
    function S(e) {
      const t = e.target.shadowRoot;
      if ((e.stopPropagation(), t)) {
        t.addEventListener(i, S, { capture: !0 }),
          t.addEventListener(
            "single-file-unregister-request-get-adopted-stylesheets",
            () => t.removeEventListener(i, S),
            { once: !0 },
          );
        const e = Array.from(t.adoptedStyleSheets).map((e) =>
          Array.from(e.cssRules)
            .map((e) => e.cssText)
            .join("\n"),
        );
        e.length &&
          t.dispatchEvent(
            new o("single-file-response-get-adopted-stylesheets", {
              detail: { adoptedStyleSheets: e },
            }),
          );
      }
    }
    async function b(e, t, n) {
      const i = {};
      return (
        (i["font-family"] = e),
        (i.src = t),
        n &&
          Object.keys(n).forEach((e) => {
            r[e] && (i[r[e]] = n[e]);
          }),
        new Promise((e) => {
          if (i.src instanceof ArrayBuffer) {
            const t = new g();
            t.readAsDataURL(new f([i.src])),
              t.addEventListener("load", () => {
                (i.src = "url(" + t.result + ")"), e(i);
              });
          } else e(i);
        })
      );
    }
    function P() {
      try {
        e.dispatchEvent(new a("resize")), y && e.dispatchEvent(new a("scroll"));
      } catch (e) {}
    }
  })("object" == typeof globalThis ? globalThis : window);
})();
