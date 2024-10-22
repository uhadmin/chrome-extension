/**
 * Developing: Navigate to chrome://extensions/. Activate developer
 * mode in the upper right. Click the load unpacked button in the upper
 * left and point it to the foler containing this code. After changing
 * this code, press the refresh button in the bottom of the extensions's
 * card to reload the extension.
 */

/**
 * This is a content script function. It has access to the DOM.
 * It is triggered when a user clicks on the extension's icon.
 * Console.logs in this function appear in the console for a page.
 */
const acquireDomContent = async () => {
  // This calls the SingleFile API:
  // https://github.com/gildas-lormeau/SingleFile/wiki/How-to-integrate-the-API-of-SingleFile-into-an-extension
  // For reasons unknown, the content available post-processing in
  // SingleFile contains styles the content returned here lacks.
  const { content } = await extension.getPageData({
    blockAudios: true,
    blockScripts: true,
    blockVideos: true,
    compressHTML: true,
    groupDuplicateImages: true,
    removeAlternativeFonts: true,
    removeAlternativeImages: true,
    removeAlternativeMedias: true,
    removeHiddenElements: true,
    removeImports: true,
    removeUnusedStyles: true,
    removeUnusedFonts: true,
    userScriptEnabled: true,
  });

  return content;
};

/**
 * Below this is the body of the extension service worker. It has no access to the DOM.
 * Console.logs in here can be seen by going to chrome://extensions/ and clicking where
 * it says "Inspect views service worker"
 */
chrome.runtime.onMessage.addListener((message, sender, callback) => {
  // Do not make this onMessage handler async, the return true must be synchronous.
  // Note that this requires old-fashioned .then's instead of awaits.
  if (message.type === "upload-file") {
    // In order for the proper cookies to be attached, this fetch must be done in the service-worker layer.
    fetch("https://app.intellpro.com/api/chrome-extension", {
      body: JSON.stringify({
        contents: message.contents,
        name: message.name,
        url: message.url,
      }),
      method: "POST",
    }).then((response) => {
      if (response.status === 401) {
        callback("Please login to IntellPro to use the chrome extension.");
      } else if (response.status === 200 || response.status === 201) {
        callback();
      } else {
        callback(
          "Unknown error. Often this can be resolved by navigating to your Drafts folder in Intellpro."
        );
      }
    });
  }
  return true; // Prevent message port from closing before async work is done.
});

/**
 * Load a couple scripts required by the SingleFile service worker.
 */
chrome.tabs.query({ active: true }, function (tabs) {
  let tab = tabs[0];
  if (!tab.url || tab.url.startsWith("chrome://")) return undefined;
  chrome.scripting.executeScript({
    files: ["/lib/chrome-browser-polyfill.js"],
    target: { tabId: tab.id, allFrames: true },
  });
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    func: acquireDomContent,
    target: { tabId: tab.id },
  });
});

/**
 * This is the code from the SingleFile service worker. There may be a better way to do this.
 */
!(function () {
  "use strict";
  "undefined" == typeof globalThis && (window.globalThis = window),
    (() => {
      if (!globalThis.browser && globalThis.chrome) {
        const e = globalThis.chrome;
        globalThis.__defineGetter__("browser", () => ({
          action: {
            onClicked: {
              addListener: (t) => e.action.onClicked.addListener(t),
            },
            setBadgeText: (t) => e.action.setBadgeText(t),
            setBadgeBackgroundColor: (t) => e.action.setBadgeBackgroundColor(t),
            setTitle: (t) => e.action.setTitle(t),
            setIcon: (t) => e.action.setIcon(t),
          },
          bookmarks: {
            get: (t) => e.bookmarks.get(t),
            onCreated: {
              addListener: (t) => e.bookmarks.onCreated.addListener(t),
              removeListener: (t) => e.bookmarks.onCreated.removeListener(t),
            },
            onChanged: {
              addListener: (t) => e.bookmarks.onChanged.addListener(t),
              removeListener: (t) => e.bookmarks.onChanged.removeListener(t),
            },
            onMoved: {
              addListener: (t) => e.bookmarks.onMoved.addListener(t),
              removeListener: (t) => e.bookmarks.onMoved.removeListener(t),
            },
            update: (t, r) => e.bookmarks.update(t, r),
          },
          commands: {
            onCommand: {
              addListener: (t) => e.commands.onCommand.addListener(t),
            },
          },
          downloads: {
            download: (t) => e.downloads.download(t),
            onChanged: {
              addListener: (t) => e.downloads.onChanged.addListener(t),
              removeListener: (t) => e.downloads.onChanged.removeListener(t),
            },
            search: (t) => e.downloads.search(t),
          },
          i18n: { getMessage: (t, r) => e.i18n.getMessage(t, r) },
          identity: {
            getRedirectURL: () => e.identity.getRedirectURL(),
            getAuthToken: (t) => e.identity.getAuthToken(t),
            launchWebAuthFlow: (t) => e.identity.launchWebAuthFlow(t),
            removeCachedAuthToken: (t) => e.identity.removeCachedAuthToken(t),
          },
          contextMenus: {
            onClicked: {
              addListener: (t) => e.contextMenus.onClicked.addListener(t),
            },
            create: (t) => e.contextMenus.create(t),
            update: (t, r) => e.contextMenus.update(t, r),
            removeAll: () => e.contextMenus.removeAll(),
          },
          permissions: {
            request: (t) => e.permissions.request(t),
            remove: (t) => e.permissions.remove(t),
          },
          runtime: {
            id: e.runtime.id,
            sendNativeMessage: (t, r) =>
              new Promise((s, a) => {
                e.runtime.sendNativeMessage(t, r, (t) => {
                  e.runtime.lastError ? a(e.runtime.lastError) : s(t);
                });
              }),
            getManifest: () => e.runtime.getManifest(),
            onMessage: {
              addListener: (t) =>
                e.runtime.onMessage.addListener((e, r, s) => {
                  const a = t(e, r);
                  if (a && "function" == typeof a.then)
                    return (
                      a.then((e) => {
                        if (void 0 !== e)
                          try {
                            s(e);
                          } catch (e) {}
                      }),
                      !0
                    );
                }),
              removeListener: (t) => e.runtime.onMessage.removeListener(t),
            },
            onMessageExternal: {
              addListener: (t) =>
                e.runtime.onMessageExternal.addListener((e, r, s) => {
                  const a = t(e, r);
                  if (a && "function" == typeof a.then)
                    return (
                      a.then((e) => {
                        if (void 0 !== e)
                          try {
                            s(e);
                          } catch (e) {}
                      }),
                      !0
                    );
                }),
            },
            sendMessage: (t) =>
              new Promise((r, s) => {
                e.runtime.sendMessage(t, (t) => {
                  e.runtime.lastError ? s(e.runtime.lastError) : r(t);
                }),
                  e.runtime.lastError && s(e.runtime.lastError);
              }),
            getURL: (t) => e.runtime.getURL(t),
            getContexts: (t) => e.runtime.getContexts(t),
            get lastError() {
              return e.runtime.lastError;
            },
          },
          scripting: { executeScript: (t) => e.scripting.executeScript(t) },
          storage: {
            local: {
              set: (t) => e.storage.local.set(t),
              get: (t) => e.storage.local.get(t),
              clear: () => e.storage.local.clear(),
              remove: (t) => e.storage.local.remove(t),
            },
            sync: {
              set: (t) => e.storage.sync.set(t),
              get: (t) => e.storage.sync.get(t),
              clear: () => e.storage.sync.clear(),
              remove: (t) => e.storage.sync.remove(t),
            },
          },
          tabs: {
            onCreated: { addListener: (t) => e.tabs.onCreated.addListener(t) },
            onActivated: {
              addListener: (t) => e.tabs.onActivated.addListener(t),
            },
            onUpdated: {
              addListener: (t) => e.tabs.onUpdated.addListener(t),
              removeListener: (t) => e.tabs.onUpdated.removeListener(t),
            },
            onRemoved: {
              addListener: (t) => e.tabs.onRemoved.addListener(t),
              removeListener: (t) => e.tabs.onRemoved.removeListener(t),
            },
            onReplaced: {
              addListener: (t) => e.tabs.onReplaced.addListener(t),
              removeListener: (t) => e.tabs.onReplaced.removeListener(t),
            },
            captureVisibleTab: (t, r) => e.tabs.captureVisibleTab(t, r),
            sendMessage: (t, r, s = {}) =>
              new Promise((a, n) => {
                e.tabs.sendMessage(t, r, s, (t) => {
                  e.runtime.lastError ? n(e.runtime.lastError) : a(t);
                }),
                  e.runtime.lastError && n(e.runtime.lastError);
              }),
            query: (t) => e.tabs.query(t),
            create: (t) => e.tabs.create(t),
            get: (t) => e.tabs.get(t),
            remove: (t) => e.tabs.remove(t),
            update: (t, r) => e.tabs.update(t, r),
          },
          devtools: {
            inspectedWindow: {
              onResourceContentCommitted: {
                addListener: (t) =>
                  e.devtools.inspectedWindow.onResourceContentCommitted.addListener(
                    t
                  ),
              },
              get tabId() {
                return e.devtools.inspectedWindow.tabId;
              },
            },
          },
          offscreen: { createDocument: (t) => e.offscreen.createDocument(t) },
          declarativeNetRequest: {
            updateSessionRules: (t) =>
              e.declarativeNetRequest.updateSessionRules(t),
          },
        }));
      }
    })();
  const e = 8388608,
    t = 1e3;
  let r = 1;
  async function s(t, r, s) {
    for (let a = 0; a * e <= s.array.length; a++) {
      const n = {
        method: "singlefile.fetchResponse",
        requestId: r,
        headers: s.headers,
        status: s.status,
        error: s.error,
      };
      (n.truncated = s.array.length > e),
        n.truncated
          ? ((n.finished = (a + 1) * e > s.array.length),
            (n.array = s.array.slice(a * e, (a + 1) * e)))
          : (n.array = s.array),
        await browser.tabs.sendMessage(t, n);
    }
    return {};
  }
  async function a(e, t) {
    const s = r++;
    return (
      await browser.declarativeNetRequest.updateSessionRules({
        addRules: [
          {
            action: {
              type: "modifyHeaders",
              requestHeaders: [
                { header: "Referer", operation: "set", value: t },
              ],
            },
            condition: {
              initiatorDomains: [browser.runtime.id],
              urlFilter: e,
              resourceTypes: ["xmlhttprequest"],
            },
            id: s,
          },
        ],
      }),
      s
    );
  }
  browser.runtime.onMessage.addListener((e, r) => {
    if (e.method && e.method.startsWith("singlefile.fetch"))
      return new Promise((n) => {
        (async function (e, r) {
          if ("singlefile.fetch" == e.method)
            try {
              const n = await (async function (e, r = {}) {
                const s = await fetch(e, r);
                if (
                  (r.referrer && 401 == s.status) ||
                  403 == s.status ||
                  404 == s.status
                ) {
                  const s = await a(e, r.referrer);
                  await new Promise((e) => setTimeout(e, t));
                  try {
                    const t = await fetch(e, r),
                      s = Array.from(new Uint8Array(await t.arrayBuffer())),
                      a = { "content-type": t.headers.get("content-type") };
                    return { array: s, headers: a, status: t.status };
                  } finally {
                    await (async function (e) {
                      await browser.declarativeNetRequest.updateSessionRules({
                        removeRuleIds: [e],
                      });
                    })(s);
                  }
                }
                const n = Array.from(new Uint8Array(await s.arrayBuffer())),
                  o = { "content-type": s.headers.get("content-type") },
                  i = s.status;
                return { array: n, headers: o, status: i };
              })(e.url, { referrer: e.referrer, headers: e.headers });
              return s(r.tab.id, e.requestId, n);
            } catch (t) {
              return s(r.tab.id, e.requestId, { error: t.message, array: [] });
            }
          else if ("singlefile.fetchFrame" == e.method)
            return browser.tabs.sendMessage(r.tab.id, e);
        })(e, r)
          .then(n)
          .catch((e) => n({ error: e && e.toString() }));
      });
  }),
    browser.runtime.onMessage.addListener((e, t) => {
      if (
        "singlefile.frameTree.initResponse" == e.method ||
        "singlefile.frameTree.ackInitRequest" == e.method
      )
        return (
          browser.tabs.sendMessage(t.tab.id, e, { frameId: 0 }),
          Promise.resolve({})
        );
    });
  const n = new Map();
  function o(e, t) {
    e.delete(t);
  }
  browser.runtime.onMessage.addListener((e, t) => {
    if ("singlefile.lazyTimeout.setTimeout" == e.method) {
      let r,
        s = n.get(t.tab.id);
      if (s)
        if (((r = s.get(t.frameId)), r)) {
          const t = r.get(e.type);
          t && clearTimeout(t);
        } else r = new Map();
      const a = setTimeout(async () => {
        try {
          const r = n.get(t.tab.id),
            s = r.get(t.frameId);
          r && s && o(s, e.type),
            await browser.tabs.sendMessage(t.tab.id, {
              method: "singlefile.lazyTimeout.onTimeout",
              type: e.type,
            });
        } catch (e) {}
      }, e.delay);
      return (
        s ||
          ((s = new Map()),
          (r = new Map()),
          s.set(t.frameId, r),
          n.set(t.tab.id, s)),
        r.set(e.type, a),
        Promise.resolve({})
      );
    }
    if ("singlefile.lazyTimeout.clearTimeout" == e.method) {
      let r = n.get(t.tab.id);
      if (r) {
        const s = r.get(t.frameId);
        if (s) {
          const t = s.get(e.type);
          t && clearTimeout(t), o(s, e.type);
        }
      }
      return Promise.resolve({});
    }
  }),
    browser.tabs.onRemoved.addListener((e) => n.delete(e));
})();
