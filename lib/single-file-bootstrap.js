!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], t)
    : t(
        ((e =
          "undefined" != typeof globalThis
            ? globalThis
            : e || self).singlefileBootstrap = {}),
      );
})(this, function (e) {
  "use strict";
  const t = "single-file-load-image",
    s = "single-file-image-loaded",
    o = "_singleFile_fontFaces",
    n = "_singleFile_worklets",
    a = globalThis.CustomEvent,
    i = globalThis.document,
    r = globalThis.Document,
    l = globalThis.JSON,
    d = globalThis.MutationObserver;
  let c, m;
  function u() {
    i instanceof r &&
      (i.addEventListener("single-file-new-font-face", (e) => {
        const t = e.detail,
          s = Object.assign({}, t);
        delete s.src, c.set(l.stringify(s), t);
      }),
      i.addEventListener("single-file-delete-font", (e) => {
        const t = e.detail,
          s = Object.assign({}, t);
        delete s.src, c.delete(l.stringify(s));
      }),
      i.addEventListener("single-file-clear-fonts", () => (c = new Map())),
      i.addEventListener("single-file-new-worklet", (e) => {
        const t = e.detail;
        m.set(t.moduleURL, t);
      }));
  }
  (c = window[o] ? window[o] : (window[o] = new Map())),
    (m = window[n] ? window[n] : (window[n] = new Map())),
    u(),
    new d(u).observe(i, { childList: !0 });
  const p = "[\\x20\\t\\r\\n\\f]",
    g = new RegExp("\\\\([\\da-f]{1,6}" + p + "?|(" + p + ")|.)", "ig");
  const h = "single-file-",
    f = "_singleFile_waitForUserScript",
    E = "__frameTree__::",
    T = h + "on-before-capture",
    b = h + "on-after-capture",
    y = h + "request-get-adopted-stylesheets",
    w = h + "response-get-adopted-stylesheets",
    I = h + "unregister-request-get-adopted-stylesheets",
    A = h + "user-script-init",
    v = "data-" + h + "removed-content",
    S = "data-" + h + "hidden-content",
    R = "data-" + h + "kept-content",
    N = "data-" + h + "hidden-frame",
    P = "data-" + h + "preserved-space-element",
    _ = "data-" + h + "shadow-root-element",
    M = "data-" + h + "win-id",
    C = "data-" + h + "image",
    O = "data-" + h + "poster",
    L = "data-" + h + "video",
    D = "data-" + h + "canvas",
    F = "data-" + h + "movable-style",
    x = "data-" + h + "input-value",
    U = "data-" + h + "input-checked",
    k = "data-" + h + "lazy-loaded-src",
    q = "data-" + h + "stylesheet",
    H = "data-" + h + "disabled-noscript",
    V = "data-" + h + "invalid-element",
    B = "data-" + h + "async-script",
    W =
      "*:not(base):not(link):not(meta):not(noscript):not(script):not(style):not(template):not(title)",
    z = [
      "NOSCRIPT",
      "DISABLED-NOSCRIPT",
      "META",
      "LINK",
      "STYLE",
      "TITLE",
      "TEMPLATE",
      "SOURCE",
      "OBJECT",
      "SCRIPT",
      "HEAD",
      "BODY",
    ],
    Y = ["SCRIPT", "NOSCRIPT", "META", "LINK", "TEMPLATE"],
    j = /^'(.*?)'$/,
    G = /^"(.*?)"$/,
    K = {
      regular: "400",
      normal: "400",
      bold: "700",
      bolder: "700",
      lighter: "100",
    },
    X = "single-file-ui-element",
    Z = "data:,",
    J = (e, t, s) => globalThis.addEventListener(e, t, s),
    $ = globalThis.JSON,
    Q = globalThis.CustomEvent,
    ee = globalThis.MutationObserver,
    te = globalThis.URL;
  function se(e, t, s) {
    e.querySelectorAll("noscript:not([" + H + "])").forEach((e) => {
      e.setAttribute(H, e.textContent), (e.textContent = "");
    }),
      (function (e) {
        e.querySelectorAll("meta[http-equiv=refresh]").forEach((e) => {
          e.removeAttribute("http-equiv"),
            e.setAttribute("disabled-http-equiv", "refresh");
        });
      })(e),
      e.head && e.head.querySelectorAll(W).forEach((e) => (e.hidden = !0)),
      e.querySelectorAll("svg foreignObject").forEach((e) => {
        const t = e.querySelectorAll(
          "html > head > " + W + ", html > body > " + W,
        );
        t.length &&
          (Array.from(e.childNodes).forEach((e) => e.remove()),
          t.forEach((t) => e.appendChild(t)));
      });
    const o = new Map();
    let n;
    t && e.documentElement
      ? (e.querySelectorAll("button button, a a").forEach((t) => {
          const s = e.createElement("template");
          s.setAttribute(V, ""),
            s.content.appendChild(t.cloneNode(!0)),
            o.set(t, s),
            t.replaceWith(s);
        }),
        (n = oe(t, e, e.documentElement, s)),
        s.moveStylesInHead &&
          e.querySelectorAll("body style, body ~ style").forEach((e) => {
            const s = ue(t, e);
            s && le(e, s) && (e.setAttribute(F, ""), n.markedElements.push(e));
          }))
      : (n = {
          canvases: [],
          images: [],
          posters: [],
          videos: [],
          usedFonts: [],
          shadowRoots: [],
          markedElements: [],
        });
    let a = "";
    if (e.referrer)
      try {
        a = new te("/", new te(e.referrer).origin).href;
      } catch (e) {}
    return {
      canvases: n.canvases,
      fonts: Array.from(c.values()),
      worklets: Array.from(m.values()),
      stylesheets: ce(e),
      images: n.images,
      posters: n.posters,
      videos: n.videos,
      usedFonts: Array.from(n.usedFonts.values()),
      shadowRoots: n.shadowRoots,
      referrer: a,
      markedElements: n.markedElements,
      invalidElements: o,
      scrollPosition: { x: t.scrollX, y: t.scrollY },
      adoptedStyleSheets: ne(e.adoptedStyleSheets),
    };
  }
  function oe(
    e,
    t,
    s,
    o,
    n = {
      usedFonts: new Map(),
      canvases: [],
      images: [],
      posters: [],
      videos: [],
      shadowRoots: [],
      markedElements: [],
    },
    a = new Map(),
    i,
  ) {
    if (s.childNodes) {
      Array.from(s.childNodes)
        .filter(
          (t) =>
            t instanceof e.HTMLElement ||
            t instanceof e.SVGElement ||
            t instanceof globalThis.HTMLElement ||
            t instanceof globalThis.SVGElement,
        )
        .forEach((s) => {
          let r, l, d;
          if (
            !o.autoSaveExternalSave &&
            (o.removeHiddenElements || o.removeUnusedFonts || o.compressHTML) &&
            ((d = ue(e, s)),
            (s instanceof e.HTMLElement ||
              s instanceof globalThis.HTMLElement) &&
              o.removeHiddenElements &&
              ((l =
                ((i || s.closest("html > head")) &&
                  z.includes(s.tagName.toUpperCase())) ||
                s.closest("details")),
              l ||
                ((r = i || le(s, d)),
                r &&
                  !Y.includes(s.tagName.toUpperCase()) &&
                  (s.setAttribute(S, ""), n.markedElements.push(s)))),
            !r)
          ) {
            if (o.compressHTML && d) {
              const e = d.getPropertyValue("white-space");
              e &&
                e.startsWith("pre") &&
                (s.setAttribute(P, ""), n.markedElements.push(s));
            }
            o.removeUnusedFonts &&
              (ae(d, o, n.usedFonts),
              ae(ue(e, s, ":first-letter"), o, n.usedFonts),
              ae(ue(e, s, ":before"), o, n.usedFonts),
              ae(ue(e, s, ":after"), o, n.usedFonts));
          }
          !(function (e, t, s, o, n, a, i) {
            const r = s.tagName && s.tagName.toUpperCase();
            if ("CANVAS" == r)
              try {
                n.canvases.push({
                  dataURI: s.toDataURL("image/png", ""),
                  backgroundColor: i.getPropertyValue("background-color"),
                }),
                  s.setAttribute(D, n.canvases.length - 1),
                  n.markedElements.push(s);
              } catch (e) {}
            if ("IMG" == r) {
              const t = {
                currentSrc: a
                  ? Z
                  : (o.loadDeferredImages && s.getAttribute(k)) || s.currentSrc,
              };
              if (
                (n.images.push(t),
                s.setAttribute(C, n.images.length - 1),
                n.markedElements.push(s),
                s.removeAttribute(k),
                (i = i || ue(e, s)))
              ) {
                t.size = (function (e, t, s) {
                  let o = t.naturalWidth,
                    n = t.naturalHeight;
                  if (!o && !n) {
                    const a = null == t.getAttribute("style");
                    if ((s = s || ue(e, t))) {
                      let e,
                        i,
                        r,
                        l,
                        d,
                        c,
                        m,
                        u,
                        p = !1;
                      if ("content-box" == s.getPropertyValue("box-sizing")) {
                        const e = t.style.getPropertyValue("box-sizing"),
                          s = t.style.getPropertyPriority("box-sizing"),
                          o = t.clientWidth;
                        t.style.setProperty(
                          "box-sizing",
                          "border-box",
                          "important",
                        ),
                          (p = t.clientWidth != o),
                          e
                            ? t.style.setProperty("box-sizing", e, s)
                            : t.style.removeProperty("box-sizing");
                      }
                      (e = me("padding-left", s)),
                        (i = me("padding-right", s)),
                        (r = me("padding-top", s)),
                        (l = me("padding-bottom", s)),
                        p
                          ? ((d = me("border-left-width", s)),
                            (c = me("border-right-width", s)),
                            (m = me("border-top-width", s)),
                            (u = me("border-bottom-width", s)))
                          : (d = c = m = u = 0),
                        (o = Math.max(0, t.clientWidth - e - i - d - c)),
                        (n = Math.max(0, t.clientHeight - r - l - m - u)),
                        a && t.removeAttribute("style");
                    }
                  }
                  return { pxWidth: o, pxHeight: n };
                })(e, s, i);
                const o = i.getPropertyValue("box-shadow"),
                  n = i.getPropertyValue("background-image");
                (o && "none" != o) ||
                  (n && "none" != n) ||
                  !(t.size.pxWidth > 1 || t.size.pxHeight > 1) ||
                  ((t.replaceable = !0),
                  (t.backgroundColor = i.getPropertyValue("background-color")),
                  (t.objectFit = i.getPropertyValue("object-fit")),
                  (t.boxSizing = i.getPropertyValue("box-sizing")),
                  (t.objectPosition = i.getPropertyValue("object-position")));
              }
            }
            if ("VIDEO" == r) {
              const o = s.currentSrc;
              if (o && !o.startsWith("blob:") && !o.startsWith("data:")) {
                const t = ue(e, s.parentNode);
                n.videos.push({
                  positionParent: t && t.getPropertyValue("position"),
                  src: o,
                  size: { pxWidth: s.clientWidth, pxHeight: s.clientHeight },
                  currentTime: s.currentTime,
                }),
                  s.setAttribute(L, n.videos.length - 1);
              }
              if (!s.getAttribute("poster")) {
                const e = t.createElement("canvas"),
                  o = e.getContext("2d");
                (e.width = s.clientWidth), (e.height = s.clientHeight);
                try {
                  o.drawImage(s, 0, 0, e.width, e.height),
                    n.posters.push(e.toDataURL("image/png", "")),
                    s.setAttribute(O, n.posters.length - 1),
                    n.markedElements.push(s);
                } catch (e) {}
              }
            }
            "IFRAME" == r &&
              a &&
              o.removeHiddenElements &&
              (s.setAttribute(N, ""), n.markedElements.push(s));
            "INPUT" == r &&
              ("password" != s.type &&
                (s.setAttribute(x, s.value), n.markedElements.push(s)),
              ("radio" != s.type && "checkbox" != s.type) ||
                (s.setAttribute(U, s.checked), n.markedElements.push(s)));
            "TEXTAREA" == r &&
              (s.setAttribute(x, s.value), n.markedElements.push(s));
            "SELECT" == r &&
              s.querySelectorAll("option").forEach((e) => {
                e.selected && (e.setAttribute(x, ""), n.markedElements.push(e));
              });
            "SCRIPT" == r &&
              (s.async &&
                "" != s.getAttribute("async") &&
                "async" != s.getAttribute("async") &&
                (s.setAttribute(B, ""), n.markedElements.push(s)),
              (s.textContent = s.textContent.replace(
                /<\/script>/gi,
                "<\\/script>",
              )));
          })(e, t, s, o, n, r, d);
          const c =
            !(
              s instanceof e.SVGElement || s instanceof globalThis.SVGElement
            ) && ie(s);
          if (
            c &&
            !s.classList.contains(X) &&
            "single-file-infobar" != s.tagName.toLowerCase()
          ) {
            const i = {};
            s.setAttribute(_, n.shadowRoots.length),
              n.markedElements.push(s),
              n.shadowRoots.push(i);
            try {
              if (c.adoptedStyleSheets)
                if (c.adoptedStyleSheets.length)
                  i.adoptedStyleSheets = ne(c.adoptedStyleSheets, a);
                else if (void 0 === c.adoptedStyleSheets.length) {
                  const e = (e) =>
                    (i.adoptedStyleSheets = e.detail.adoptedStyleSheets);
                  c.addEventListener(w, e),
                    c.dispatchEvent(new Q(y, { bubbles: !0 })),
                    i.adoptedStyleSheets ||
                      s.dispatchEvent(new Q(y, { bubbles: !0 })),
                    c.removeEventListener(w, e);
                }
            } catch (e) {}
            oe(e, t, c, o, n, a, r),
              (i.content = c.innerHTML),
              (i.mode = c.mode),
              (i.delegateFocus = c.delegatesFocus),
              (i.clonable = c.clonable),
              (i.serializable = c.serializable);
            try {
              c.adoptedStyleSheets &&
                void 0 === c.adoptedStyleSheets.length &&
                c.dispatchEvent(new Q(I, { bubbles: !0 }));
            } catch (e) {}
          }
          oe(e, t, s, o, n, a, r),
            !o.autoSaveExternalSave &&
              o.removeHiddenElements &&
              i &&
              (l || "" == s.getAttribute(R)
                ? s.parentElement &&
                  (s.parentElement.setAttribute(R, ""),
                  n.markedElements.push(s.parentElement))
                : r && (s.setAttribute(v, ""), n.markedElements.push(s)));
        });
    }
    return n;
  }
  function ne(e, t = new Map()) {
    if (e) {
      const s = [];
      for (const o of Array.from(e))
        if (t.has(o)) s.push(t.get(o));
        else {
          let e = "";
          if (o && o.cssRules)
            for (const t of o.cssRules) e += t.cssText + "\n";
          t.set(o, e), s.push(e);
        }
      return s;
    }
    return [];
  }
  function ae(e, t, s) {
    if (e) {
      const o = e.getPropertyValue("font-style") || "normal";
      e.getPropertyValue("font-family")
        .split(",")
        .forEach((n) => {
          if (
            ((n = re(n)),
            !t.loadedFonts ||
              t.loadedFonts.find((e) => re(e.family) == n && e.style == o))
          ) {
            const t =
                ((a = e.getPropertyValue("font-weight")),
                K[a.toLowerCase().trim()] || a),
              i = e.getPropertyValue("font-variant") || "normal",
              r = [n, t, o, i];
            s.set($.stringify(r), [n, t, o, i]);
          }
          var a;
        });
    }
  }
  function ie(e) {
    const t = globalThis.chrome;
    if (e.openOrClosedShadowRoot) return e.openOrClosedShadowRoot;
    if (!(t && t.dom && t.dom.openOrClosedShadowRoot)) return e.shadowRoot;
    try {
      return t.dom.openOrClosedShadowRoot(e);
    } catch (t) {
      return e.shadowRoot;
    }
  }
  function re(e = "") {
    return (function (e) {
      e = e.match(j) ? e.replace(j, "$1") : e.replace(G, "$1");
      return e.trim();
    })(
      ((t = e.trim()),
      t.replace(g, (e, t, s) => {
        const o = "0x" + t - 65536;
        return o != o || s
          ? t
          : o < 0
          ? String.fromCharCode(o + 65536)
          : String.fromCharCode((o >> 10) | 55296, (1023 & o) | 56320);
      })),
    ).toLowerCase();
    var t;
  }
  function le(e, t) {
    let s = !1;
    if (t) {
      const o = t.getPropertyValue("display"),
        n = t.getPropertyValue("opacity"),
        a = t.getPropertyValue("visibility");
      if (
        ((s = "none" == o),
        !s && ("0" == n || "hidden" == a) && e.getBoundingClientRect)
      ) {
        const t = e.getBoundingClientRect();
        s = !t.width && !t.height;
      }
    }
    return Boolean(s);
  }
  function de(e, t, s) {
    if (
      (e.querySelectorAll("[" + H + "]").forEach((e) => {
        (e.textContent = e.getAttribute(H)), e.removeAttribute(H);
      }),
      e.querySelectorAll("meta[disabled-http-equiv]").forEach((e) => {
        e.setAttribute("http-equiv", e.getAttribute("disabled-http-equiv")),
          e.removeAttribute("disabled-http-equiv");
      }),
      e.head &&
        e.head
          .querySelectorAll(
            "*:not(base):not(link):not(meta):not(noscript):not(script):not(style):not(template):not(title)",
          )
          .forEach((e) => e.removeAttribute("hidden")),
      !t)
    ) {
      const s = [v, N, S, P, C, O, L, D, x, U, _, q, B];
      t = e.querySelectorAll(s.map((e) => "[" + e + "]").join(","));
    }
    t.forEach((e) => {
      e.removeAttribute(v),
        e.removeAttribute(S),
        e.removeAttribute(R),
        e.removeAttribute(N),
        e.removeAttribute(P),
        e.removeAttribute(C),
        e.removeAttribute(O),
        e.removeAttribute(L),
        e.removeAttribute(D),
        e.removeAttribute(x),
        e.removeAttribute(U),
        e.removeAttribute(_),
        e.removeAttribute(q),
        e.removeAttribute(B),
        e.removeAttribute(F);
    }),
      s && s.forEach((e, t) => e.replaceWith(t));
  }
  function ce(e) {
    if (e) {
      const t = [];
      return (
        e.querySelectorAll("style").forEach((s, o) => {
          try {
            if (!s.sheet.disabled) {
              const n = e.createElement("style");
              (n.textContent = s.textContent), e.body.appendChild(n);
              const a = n.sheet;
              n.remove();
              const i = Array.from(a.cssRules)
                  .map((e) => e.cssText)
                  .join("\n"),
                r = Array.from(s.sheet.cssRules)
                  .map((e) => e.cssText)
                  .join("\n");
              (a && i == r) ||
                (s.setAttribute(q, o),
                (t[o] = Array.from(s.sheet.cssRules)
                  .map((e) => e.cssText)
                  .join("\n")));
            }
          } catch (e) {}
        }),
        t
      );
    }
  }
  function me(e, t) {
    if (t.getPropertyValue(e).endsWith("px"))
      return parseFloat(t.getPropertyValue(e));
  }
  function ue(e, t, s) {
    try {
      return e.getComputedStyle(t, s);
    } catch (e) {}
  }
  const pe = { LAZY_SRC_ATTRIBUTE_NAME: k, SINGLE_FILE_UI_ELEMENT_CLASS: X },
    ge = "attributes",
    he = globalThis.browser,
    fe = globalThis.document,
    Ee = globalThis.MutationObserver,
    Te = new Map();
  let be;
  async function ye(e) {
    if (fe.documentElement) {
      Te.clear();
      const o = fe.body
          ? Math.max(fe.body.scrollHeight, fe.documentElement.scrollHeight)
          : fe.documentElement.scrollHeight,
        n = fe.body
          ? Math.max(fe.body.scrollWidth, fe.documentElement.scrollWidth)
          : fe.documentElement.scrollWidth;
      if (o > globalThis.innerHeight || n > globalThis.innerWidth) {
        const r = Math.max(o - 1.5 * globalThis.innerHeight, 0),
          l = Math.max(n - 1.5 * globalThis.innerWidth, 0);
        if (globalThis.scrollY < r || globalThis.scrollX < l)
          return (function (e) {
            return (
              (be = 0),
              new Promise(async (o) => {
                let n;
                const r = new Set(),
                  l = new Ee(async (t) => {
                    if ((t = t.filter((e) => e.type == ge)).length) {
                      t.filter((e) => {
                        if (
                          ("src" == e.attributeName &&
                            (e.target.setAttribute(
                              pe.LAZY_SRC_ATTRIBUTE_NAME,
                              e.target.src,
                            ),
                            e.target.addEventListener("load", c)),
                          "src" == e.attributeName ||
                            "srcset" == e.attributeName ||
                            (e.target.tagName &&
                              "SOURCE" == e.target.tagName.toUpperCase()))
                        )
                          return (
                            !e.target.classList ||
                            !e.target.classList.contains(
                              pe.SINGLE_FILE_UI_ELEMENT_CLASS,
                            )
                          );
                      }).length &&
                        ((n = !0),
                        await Ie(l, e, p),
                        r.size || (await we(l, e, p)));
                    }
                  });
                async function d(t) {
                  await ve(
                    "idleTimeout",
                    async () => {
                      n
                        ? be < 10 &&
                          (be++,
                          Re("idleTimeout"),
                          await d(Math.max(500, t / 2)))
                        : (Re("loadTimeout"), Re("maxTimeout"), Ae(l, e, p));
                    },
                    t,
                    e.loadDeferredImagesNativeTimeout,
                  );
                }
                function c(e) {
                  const t = e.target;
                  t.removeAttribute(pe.LAZY_SRC_ATTRIBUTE_NAME),
                    t.removeEventListener("load", c);
                }
                async function m(t) {
                  (n = !0),
                    await Ie(l, e, p),
                    await we(l, e, p),
                    t.detail && r.add(t.detail);
                }
                async function u(t) {
                  await Ie(l, e, p),
                    await we(l, e, p),
                    r.delete(t.detail),
                    r.size || (await we(l, e, p));
                }
                function p(e) {
                  l.disconnect(),
                    fe.removeEventListener(t, m),
                    fe.removeEventListener(s, u),
                    o(e);
                }
                await d(2 * e.loadDeferredImagesMaxIdleTime),
                  await Ie(l, e, p),
                  l.observe(fe, { subtree: !0, childList: !0, attributes: !0 }),
                  fe.addEventListener(t, m),
                  fe.addEventListener(s, u),
                  (function (e) {
                    e.loadDeferredImagesBlockCookies &&
                      i.dispatchEvent(new a("single-file-block-cookies-start")),
                      e.loadDeferredImagesBlockStorage &&
                        i.dispatchEvent(
                          new a("single-file-block-storage-start"),
                        ),
                      e.loadDeferredImagesDispatchScrollEvent &&
                        i.dispatchEvent(
                          new a("single-file-dispatch-scroll-event-start"),
                        ),
                      e.loadDeferredImagesKeepZoomLevel
                        ? i.dispatchEvent(
                            new a(
                              "single-file-load-deferred-images-keep-zoom-level-start",
                            ),
                          )
                        : i.dispatchEvent(
                            new a("single-file-load-deferred-images-start"),
                          );
                  })(e);
              })
            );
          })(e);
      }
    }
  }
  async function we(e, t, s) {
    await ve(
      "loadTimeout",
      () => Ae(e, t, s),
      t.loadDeferredImagesMaxIdleTime,
      t.loadDeferredImagesNativeTimeout,
    );
  }
  async function Ie(e, t, s) {
    await ve(
      "maxTimeout",
      async () => {
        await Re("loadTimeout"), await Ae(e, t, s);
      },
      10 * t.loadDeferredImagesMaxIdleTime,
      t.loadDeferredImagesNativeTimeout,
    );
  }
  async function Ae(e, t, s) {
    await Re("idleTimeout"),
      (function (e) {
        e.loadDeferredImagesBlockCookies &&
          i.dispatchEvent(new a("single-file-block-cookies-end")),
          e.loadDeferredImagesBlockStorage &&
            i.dispatchEvent(new a("single-file-block-storage-end")),
          e.loadDeferredImagesDispatchScrollEvent &&
            i.dispatchEvent(new a("single-file-dispatch-scroll-event-end")),
          e.loadDeferredImagesKeepZoomLevel
            ? i.dispatchEvent(
                new a("single-file-load-deferred-images-keep-zoom-level-end"),
              )
            : i.dispatchEvent(new a("single-file-load-deferred-images-end"));
      })(t),
      await ve(
        "endTimeout",
        async () => {
          await Re("maxTimeout"), s();
        },
        t.loadDeferredImagesMaxIdleTime / 2,
        t.loadDeferredImagesNativeTimeout,
      ),
      e.disconnect();
  }
  async function ve(e, t, s, o) {
    if (he && he.runtime && he.runtime.sendMessage && !o) {
      if (!Te.get(e) || !Te.get(e).pending) {
        const o = { callback: t, pending: !0 };
        Te.set(e, o);
        try {
          await he.runtime.sendMessage({
            method: "singlefile.lazyTimeout.setTimeout",
            type: e,
            delay: s,
          });
        } catch (o) {
          Se(e, t, s);
        }
        o.pending = !1;
      }
    } else Se(e, t, s);
  }
  function Se(e, t, s) {
    const o = Te.get(e);
    o && globalThis.clearTimeout(o), Te.set(e, t), globalThis.setTimeout(t, s);
  }
  async function Re(e) {
    if (he && he.runtime && he.runtime.sendMessage)
      try {
        await he.runtime.sendMessage({
          method: "singlefile.lazyTimeout.clearTimeout",
          type: e,
        });
      } catch (t) {
        Ne(e);
      }
    else Ne(e);
  }
  function Ne(e) {
    const t = Te.get(e);
    Te.delete(e), t && globalThis.clearTimeout(t);
  }
  he &&
    he.runtime &&
    he.runtime.onMessage &&
    he.runtime.onMessage.addListener &&
    he.runtime.onMessage.addListener((e) => {
      if ("singlefile.lazyTimeout.onTimeout" == e.method) {
        const t = Te.get(e.type);
        if (t) {
          Te.delete(e.type);
          try {
            t.callback();
          } catch (t) {
            Ne(e.type);
          }
        }
      }
    });
  const Pe = {
      ON_BEFORE_CAPTURE_EVENT_NAME: T,
      ON_AFTER_CAPTURE_EVENT_NAME: b,
      WIN_ID_ATTRIBUTE_NAME: M,
      WAIT_FOR_USERSCRIPT_PROPERTY_NAME: f,
      preProcessDoc: se,
      serialize: function (e) {
        const t = e.doctype;
        let s = "";
        return (
          t &&
            ((s = "<!DOCTYPE " + t.nodeName),
            t.publicId
              ? ((s += ' PUBLIC "' + t.publicId + '"'),
                t.systemId && (s += ' "' + t.systemId + '"'))
              : t.systemId && (s += ' SYSTEM "' + t.systemId + '"'),
            t.internalSubset && (s += " [" + t.internalSubset + "]"),
            (s += "> ")),
          s + e.documentElement.outerHTML
        );
      },
      postProcessDoc: de,
      getShadowRoot: ie,
    },
    _e = 'iframe, frame, object[type="text/html"][data]',
    Me = "singlefile.frameTree.initRequest",
    Ce = "singlefile.frameTree.ackInitRequest",
    Oe = "singlefile.frameTree.cleanupRequest",
    Le = "singlefile.frameTree.initResponse",
    De = 5e3,
    Fe = ".",
    xe = globalThis.window == globalThis.top,
    Ue = globalThis.browser,
    ke = globalThis.top,
    qe = globalThis.MessageChannel,
    He = globalThis.document,
    Ve = globalThis.JSON,
    Be = globalThis.MutationObserver,
    We = globalThis.DOMParser;
  let ze,
    Ye = globalThis.sessions;
  function je() {
    globalThis.addEventListener(
      "message",
      async (e) => {
        if ("string" == typeof e.data && e.data.startsWith(E)) {
          e.preventDefault(), e.stopPropagation();
          const t = Ve.parse(e.data.substring(15));
          if (t.method == Me)
            e.source &&
              st(e.source, {
                method: Ce,
                windowId: t.windowId,
                sessionId: t.sessionId,
              }),
              xe ||
                (globalThis.stop(),
                t.options.loadDeferredImages && ye(t.options),
                await Ke(t));
          else if (t.method == Ce)
            $e("requestTimeouts", t.sessionId, t.windowId),
              Qe(t.sessionId, t.windowId);
          else if (t.method == Oe) Xe(t);
          else if (t.method == Le && Ye.get(t.sessionId)) {
            e.ports[0].onmessage = (e) => Ze(e.data);
          }
        }
      },
      !0,
    );
  }
  function Ge() {
    return globalThis.crypto.getRandomValues(new Uint32Array(32)).join("");
  }
  async function Ke(e) {
    const t = e.sessionId,
      s = globalThis[Pe.WAIT_FOR_USERSCRIPT_PROPERTY_NAME];
    delete globalThis._singleFile_cleaningUp,
      xe || (ze = globalThis.frameId = e.windowId),
      Je(He, e.options, ze, t),
      xe ||
        (e.options.userScriptEnabled &&
          s &&
          (await s(Pe.ON_BEFORE_CAPTURE_EVENT_NAME, e.options)),
        tt({
          frames: [ot(He, globalThis, ze, e.options, e.scrolling)],
          sessionId: t,
          requestedFrameId: He.documentElement.dataset.requestedFrameId && ze,
        }),
        e.options.userScriptEnabled &&
          s &&
          (await s(Pe.ON_AFTER_CAPTURE_EVENT_NAME, e.options)),
        delete He.documentElement.dataset.requestedFrameId);
  }
  function Xe(e) {
    if (!globalThis._singleFile_cleaningUp) {
      globalThis._singleFile_cleaningUp = !0;
      const t = e.sessionId;
      et(nt(He), e.windowId, t);
    }
  }
  function Ze(e) {
    e.frames.forEach((t) => $e("responseTimeouts", e.sessionId, t.windowId));
    const t = Ye.get(e.sessionId);
    if (t) {
      e.requestedFrameId && (t.requestedFrameId = e.requestedFrameId),
        e.frames.forEach((e) => {
          let s = t.frames.find((t) => e.windowId == t.windowId);
          s || ((s = { windowId: e.windowId }), t.frames.push(s)),
            s.processed ||
              ((s.content = e.content),
              (s.baseURI = e.baseURI),
              (s.title = e.title),
              (s.url = e.url),
              (s.canvases = e.canvases),
              (s.fonts = e.fonts),
              (s.worklets = e.worklets),
              (s.stylesheets = e.stylesheets),
              (s.images = e.images),
              (s.posters = e.posters),
              (s.videos = e.videos),
              (s.usedFonts = e.usedFonts),
              (s.shadowRoots = e.shadowRoots),
              (s.processed = e.processed),
              (s.scrollPosition = e.scrollPosition),
              (s.scrolling = e.scrolling),
              (s.adoptedStyleSheets = e.adoptedStyleSheets));
        });
      t.frames.filter((e) => !e.processed).length ||
        ((t.frames = t.frames.sort(
          (e, t) => t.windowId.split(Fe).length - e.windowId.split(Fe).length,
        )),
        t.resolve &&
          (t.requestedFrameId &&
            t.frames.forEach((e) => {
              e.windowId == t.requestedFrameId && (e.requestedFrame = !0);
            }),
          t.resolve(t.frames)));
    }
  }
  function Je(e, t, s, o) {
    const n = nt(e);
    !(function (e, t, s, o, n) {
      const a = [];
      let i;
      Ye.get(n)
        ? (i = Ye.get(n).requestTimeouts)
        : ((i = {}), Ye.set(n, { requestTimeouts: i }));
      t.forEach((e, t) => {
        const s = o + Fe + t;
        e.setAttribute(Pe.WIN_ID_ATTRIBUTE_NAME, s), a.push({ windowId: s });
      }),
        tt({
          frames: a,
          sessionId: n,
          requestedFrameId: e.documentElement.dataset.requestedFrameId && o,
        }),
        t.forEach((e, t) => {
          const a = o + Fe + t;
          try {
            st(e.contentWindow, {
              method: Me,
              windowId: a,
              sessionId: n,
              options: s,
              scrolling: e.scrolling,
            });
          } catch (e) {}
          i[a] = globalThis.setTimeout(
            () =>
              tt({ frames: [{ windowId: a, processed: !0 }], sessionId: n }),
            De,
          );
        }),
        delete e.documentElement.dataset.requestedFrameId;
    })(e, n, t, s, o),
      n.length &&
        (function (e, t, s, o, n) {
          const a = [];
          t.forEach((e, t) => {
            const i = o + Fe + t;
            let r, l;
            try {
              (r = e.contentDocument), (l = e.contentWindow), l.stop();
            } catch (e) {}
            const d = e.getAttribute("srcdoc");
            if (!r && d) {
              (r = new We().parseFromString(d, "text/html")), (l = globalThis);
            }
            if (r)
              try {
                $e("requestTimeouts", n, i),
                  Je(r, s, i, n),
                  a.push(ot(r, l, i, s, e.scrolling));
              } catch (e) {
                a.push({ windowId: i, processed: !0 });
              }
          }),
            tt({
              frames: a,
              sessionId: n,
              requestedFrameId: e.documentElement.dataset.requestedFrameId && o,
            }),
            delete e.documentElement.dataset.requestedFrameId;
        })(e, n, t, s, o);
  }
  function $e(e, t, s) {
    const o = Ye.get(t);
    if (o && o[e]) {
      const t = o[e][s];
      t && (globalThis.clearTimeout(t), delete o[e][s]);
    }
  }
  function Qe(e, t) {
    const s = Ye.get(e);
    s &&
      s.responseTimeouts &&
      (s.responseTimeouts[t] = globalThis.setTimeout(
        () => tt({ frames: [{ windowId: t, processed: !0 }], sessionId: e }),
        1e4,
      ));
  }
  function et(e, t, s) {
    e.forEach((e, o) => {
      const n = t + Fe + o;
      e.removeAttribute(Pe.WIN_ID_ATTRIBUTE_NAME);
      try {
        st(e.contentWindow, { method: Oe, windowId: n, sessionId: s });
      } catch (e) {}
    }),
      e.forEach((e, o) => {
        const n = t + Fe + o;
        let a;
        try {
          a = e.contentDocument;
        } catch (e) {}
        if (a)
          try {
            et(nt(a), n, s);
          } catch (e) {}
      });
  }
  function tt(e) {
    e.method = Le;
    try {
      ke.singlefile.processors.frameTree.initResponse(e);
    } catch (t) {
      st(ke, e, !0);
    }
  }
  function st(e, t, s) {
    if (e == ke && Ue && Ue.runtime && Ue.runtime.sendMessage)
      Ue.runtime.sendMessage(t);
    else if (s) {
      const s = new qe();
      e.postMessage(
        E + Ve.stringify({ method: t.method, sessionId: t.sessionId }),
        "*",
        [s.port2],
      ),
        s.port1.postMessage(t);
    } else e.postMessage(E + Ve.stringify(t), "*");
  }
  function ot(e, t, s, o, n) {
    const a = Pe.preProcessDoc(e, t, o),
      i = Pe.serialize(e);
    Pe.postProcessDoc(e, a.markedElements, a.invalidElements);
    return {
      windowId: s,
      content: i,
      baseURI: e.baseURI.split("#")[0],
      url: e.documentURI,
      title: e.title,
      canvases: a.canvases,
      fonts: a.fonts,
      worklets: a.worklets,
      stylesheets: a.stylesheets,
      images: a.images,
      posters: a.posters,
      videos: a.videos,
      usedFonts: a.usedFonts,
      shadowRoots: a.shadowRoots,
      scrollPosition: a.scrollPosition,
      scrolling: n,
      adoptedStyleSheets: a.adoptedStyleSheets,
      processed: !0,
    };
  }
  function nt(e) {
    let t = Array.from(e.querySelectorAll(_e));
    return (
      e.querySelectorAll("*").forEach((e) => {
        const s = Pe.getShadowRoot(e);
        s && (t = t.concat(...s.querySelectorAll(_e)));
      }),
      t
    );
  }
  Ye || (Ye = globalThis.sessions = new Map()),
    xe &&
      ((ze = "0"),
      Ue &&
        Ue.runtime &&
        Ue.runtime.onMessage &&
        Ue.runtime.onMessage.addListener &&
        Ue.runtime.onMessage.addListener((e) =>
          e.method == Le
            ? (Ze(e), Promise.resolve({}))
            : e.method == Ce
            ? ($e("requestTimeouts", e.sessionId, e.windowId),
              Qe(e.sessionId, e.windowId),
              Promise.resolve({}))
            : void 0,
        )),
    je(),
    new Be(je).observe(He, { childList: !0 });
  const at = [
      "AREA",
      "BASE",
      "BR",
      "COL",
      "COMMAND",
      "EMBED",
      "HR",
      "IMG",
      "INPUT",
      "KEYGEN",
      "LINK",
      "META",
      "PARAM",
      "SOURCE",
      "TRACK",
      "WBR",
    ],
    it = [
      {
        tagName: "HEAD",
        accept: (e) => !e.childNodes.length || 1 == e.childNodes[0].nodeType,
      },
      { tagName: "BODY", accept: (e) => !e.childNodes.length },
    ],
    rt = [
      { tagName: "HTML", accept: (e) => !e || 8 != e.nodeType },
      {
        tagName: "HEAD",
        accept: (e) =>
          !e || (8 != e.nodeType && (3 != e.nodeType || !ct(e.textContent))),
      },
      { tagName: "BODY", accept: (e) => !e || 8 != e.nodeType },
      {
        tagName: "LI",
        accept: (e, t) =>
          (!e &&
            t.parentElement &&
            ("UL" == mt(t.parentElement) || "OL" == mt(t.parentElement))) ||
          (e && ["LI"].includes(mt(e))),
      },
      { tagName: "DT", accept: (e) => !e || ["DT", "DD"].includes(mt(e)) },
      {
        tagName: "P",
        accept: (e) =>
          e &&
          [
            "ADDRESS",
            "ARTICLE",
            "ASIDE",
            "BLOCKQUOTE",
            "DETAILS",
            "DIV",
            "DL",
            "FIELDSET",
            "FIGCAPTION",
            "FIGURE",
            "FOOTER",
            "FORM",
            "H1",
            "H2",
            "H3",
            "H4",
            "H5",
            "H6",
            "HEADER",
            "HR",
            "MAIN",
            "NAV",
            "OL",
            "P",
            "PRE",
            "SECTION",
            "TABLE",
            "UL",
          ].includes(mt(e)),
      },
      { tagName: "DD", accept: (e) => !e || ["DT", "DD"].includes(mt(e)) },
      { tagName: "RT", accept: (e) => !e || ["RT", "RP"].includes(mt(e)) },
      { tagName: "RP", accept: (e) => !e || ["RT", "RP"].includes(mt(e)) },
      {
        tagName: "OPTGROUP",
        accept: (e) => !e || ["OPTGROUP"].includes(mt(e)),
      },
      {
        tagName: "OPTION",
        accept: (e) => !e || ["OPTION", "OPTGROUP"].includes(mt(e)),
      },
      {
        tagName: "COLGROUP",
        accept: (e) =>
          !e || (8 != e.nodeType && (3 != e.nodeType || !ct(e.textContent))),
      },
      {
        tagName: "CAPTION",
        accept: (e) =>
          !e || (8 != e.nodeType && (3 != e.nodeType || !ct(e.textContent))),
      },
      {
        tagName: "THEAD",
        accept: (e) => !e || ["TBODY", "TFOOT"].includes(mt(e)),
      },
      {
        tagName: "TBODY",
        accept: (e) => !e || ["TBODY", "TFOOT"].includes(mt(e)),
      },
      { tagName: "TFOOT", accept: (e) => !e },
      { tagName: "TR", accept: (e) => !e || ["TR"].includes(mt(e)) },
      { tagName: "TD", accept: (e) => !e || ["TD", "TH"].includes(mt(e)) },
      { tagName: "TH", accept: (e) => !e || ["TD", "TH"].includes(mt(e)) },
    ],
    lt = [
      "STYLE",
      "SCRIPT",
      "XMP",
      "IFRAME",
      "NOEMBED",
      "NOFRAMES",
      "PLAINTEXT",
      "NOSCRIPT",
    ];
  function dt(e, t, s) {
    return 3 == e.nodeType
      ? (function (e) {
          const t = e.parentNode;
          let s;
          t && 1 == t.nodeType && (s = mt(t));
          return !s || lt.includes(s)
            ? ("SCRIPT" != s || (t.type && "text/javascript" != t.type)) &&
              "STYLE" != s
              ? e.textContent
              : e.textContent.replace(/<\//gi, "<\\/").replace(/\/>/gi, "\\/>")
            : e.textContent
                .replace(/&/g, "&amp;")
                .replace(/\u00a0/g, "&nbsp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
        })(e)
      : 8 == e.nodeType
      ? "\x3c!--" + e.textContent + "--\x3e"
      : 1 == e.nodeType
      ? (function (e, t, s) {
          const o = mt(e),
            n = t && it.find((t) => o == mt(t) && t.accept(e));
          let a = "";
          (n && !e.attributes.length) ||
            ((a = "<" + o.toLowerCase()),
            Array.from(e.attributes).forEach(
              (s) =>
                (a += (function (e, t, s) {
                  const o = e.name;
                  let n = "";
                  if (!o.match(/["'>/=]/)) {
                    let a,
                      i = e.value;
                    s &&
                      "class" == o &&
                      (i = Array.from(t.classList)
                        .map((e) => e.trim())
                        .join(" ")),
                      (i = i
                        .replace(/&/g, "&amp;")
                        .replace(/\u00a0/g, "&nbsp;")),
                      i.includes('"') &&
                        (i.includes("'") || !s
                          ? (i = i.replace(/"/g, "&quot;"))
                          : (a = !0));
                    const r = !s || i.match(/[ \t\n\f\r'"`=<>]/);
                    (n += " "),
                      e.namespace
                        ? "http://www.w3.org/XML/1998/namespace" ==
                          e.namespaceURI
                          ? (n += "xml:" + o)
                          : "http://www.w3.org/2000/xmlns/" == e.namespaceURI
                          ? ("xmlns" !== o && (n += "xmlns:"), (n += o))
                          : "http://www.w3.org/1999/xlink" == e.namespaceURI
                          ? (n += "xlink:" + o)
                          : (n += o)
                        : (n += o),
                      "" != i &&
                        ((n += "="),
                        r && (n += a ? "'" : '"'),
                        (n += i),
                        r && (n += a ? "'" : '"'));
                  }
                  return n;
                })(s, e, t)),
            ),
            (a += ">"));
          "TEMPLATE" != o || e.childNodes.length
            ? Array.from(e.childNodes).forEach(
                (e) => (a += dt(e, t, s || "svg" == o)),
              )
            : (a += e.innerHTML);
          const i =
            t && rt.find((t) => o == mt(t) && t.accept(e.nextSibling, e));
          (s || (!i && !at.includes(o))) && (a += "</" + o.toLowerCase() + ">");
          return a;
        })(e, t, s)
      : void 0;
  }
  function ct(e) {
    return Boolean(e.match(/^[ \t\n\f\r]/));
  }
  function mt(e) {
    return e.tagName && e.tagName.toUpperCase();
  }
  const ut = {
      frameTree: Object.freeze({
        __proto__: null,
        TIMEOUT_INIT_REQUEST_MESSAGE: De,
        cleanup: function (e) {
          Ye.delete(e),
            Xe({ windowId: ze, sessionId: e, options: { sessionId: e } });
        },
        getAsync: function (e) {
          const t = Ge();
          return (
            (e = Ve.parse(Ve.stringify(e))),
            new Promise((s) => {
              Ye.set(t, {
                frames: [],
                requestTimeouts: {},
                responseTimeouts: {},
                resolve: (e) => {
                  (e.sessionId = t), s(e);
                },
              }),
                Ke({ windowId: ze, sessionId: t, options: e });
            })
          );
        },
        getSync: function (e) {
          const t = Ge();
          (e = Ve.parse(Ve.stringify(e))),
            Ye.set(t, {
              frames: [],
              requestTimeouts: {},
              responseTimeouts: {},
            }),
            (function (e) {
              const t = e.sessionId,
                s = globalThis[Pe.WAIT_FOR_USERSCRIPT_PROPERTY_NAME];
              delete globalThis._singleFile_cleaningUp,
                xe || (ze = globalThis.frameId = e.windowId);
              Je(He, e.options, ze, t),
                xe ||
                  (e.options.userScriptEnabled &&
                    s &&
                    s(Pe.ON_BEFORE_CAPTURE_EVENT_NAME, e.options),
                  tt({
                    frames: [ot(He, globalThis, ze, e.options, e.scrolling)],
                    sessionId: t,
                    requestedFrameId:
                      He.documentElement.dataset.requestedFrameId && ze,
                  }),
                  e.options.userScriptEnabled &&
                    s &&
                    s(Pe.ON_AFTER_CAPTURE_EVENT_NAME, e.options),
                  delete He.documentElement.dataset.requestedFrameId);
            })({ windowId: ze, sessionId: t, options: e });
          const s = Ye.get(t).frames;
          return (s.sessionId = t), s;
        },
        initResponse: Ze,
      }),
    },
    pt = {
      COMMENT_HEADER: "Page saved with SingleFile",
      COMMENT_HEADER_LEGACY: "Archive processed by SingleFile",
      ON_BEFORE_CAPTURE_EVENT_NAME: T,
      ON_AFTER_CAPTURE_EVENT_NAME: b,
      WAIT_FOR_USERSCRIPT_PROPERTY_NAME: f,
      preProcessDoc: se,
      postProcessDoc: de,
      serialize: (e, t) =>
        (function (e, t) {
          const s = e.doctype;
          let o = "";
          return (
            s &&
              ((o = "<!DOCTYPE " + s.nodeName),
              s.publicId
                ? ((o += ' PUBLIC "' + s.publicId + '"'),
                  s.systemId && (o += ' "' + s.systemId + '"'))
                : s.systemId && (o += ' SYSTEM "' + s.systemId + '"'),
              s.internalSubset && (o += " [" + s.internalSubset + "]"),
              (o += "> ")),
            o + dt(e.documentElement, t)
          );
        })(e, t),
      getShadowRoot: ie,
    };
  !(function e() {
    J(
      A,
      () =>
        (globalThis[f] = async (e, t) => {
          const s = Object.assign({}, t);
          delete s.win,
            delete s.doc,
            delete s.onprogress,
            delete s.frames,
            delete s.taskId,
            delete s._migratedTemplateFormat,
            delete s.woleetKey;
          const o = new Q(e + "-request", {
            cancelable: !0,
            detail: { options: s },
          });
          let n;
          const a = new Promise((s) => {
            (n = s),
              J(e + "-response", (e) => {
                e.detail &&
                  e.detail.options &&
                  Object.assign(t, e.detail.options),
                  s();
              });
          });
          ((e) => {
            try {
              globalThis.dispatchEvent(e);
            } catch (e) {}
          })(o),
            o.defaultPrevented ? await a : n();
        }),
    ),
      new ee(e).observe(globalThis.document, { childList: !0 });
  })(),
    (e.helper = pt),
    (e.processors = ut);
});