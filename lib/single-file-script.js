// ==UserScript==
// @name         Send data to IntellPro
// @namespace    /chrome-extension/lib/single-file-script
// @version      1.0
// @description  [SingleFile] Send data to IntellPro
// @author       Brian Cato
// @match        *://*/*
// @grant        none
// ==/UserScript==
(() => {
  removeHandler = `onClick="(()=>document.querySelector('#intellproExtensionStatusBar').remove())();"`;

  const wrapperCss =
    "style='align-items:end;background:#EFF6FF;border:1px solid #D1D5DB;border-radius:8px;box-shadow: 0 4px 4px #00000025;display:flex;flex-direction:column;font-family:sans-serif;height:100px;position:fixed;right:10px;top:10px;width:340px;z-index:999999999;'";
  const crossCss =
    "style='height:10px;position:absolute;right:10px;top:10px;width:10px;'";
  const iconCss = "style='height:30px;margin-right:10px;width:30px;'";
  const titleCss =
    "style='color:#1F2937;display:flex;font-size:24px;font-weight:600;margin-bottom:10px;margin-top:2px;padding-right:34px;'";
  const statusCss =
    "style='color:#3B82F6;font-size:14px;font-weight:500;margin-right:16px;padding-right:34px;'";
  const statusHtml = `<div id='intellproExtensionStatusBar' ${wrapperCss}>
    <div ${removeHandler} style='height:20px;'>
      <img id="chromeExtensionCross" ${crossCss} src="./cross.png">
    </div>
    <div><h2 ${titleCss}>
      <img id="chromeExtensionIcon" ${iconCss} src="./intellpro-logo-small.png">
      IntellPro Web Clipper
    </h2></div>
    <div id='intellproExtensionStatus' ${statusCss}>Saving page...</div>
    </div>`;

  // We tap into special events built into SingleFile
  // to do post-processing on the HTML.
  // https://github.com/gildas-lormeau/SingleFile/wiki/How-to-execute-a-user-script-before-a-page-is-saved
  dispatchEvent(new CustomEvent("single-file-user-script-init"));

  /**
   * Setup the status indicator before processing.
   */
  addEventListener("single-file-on-before-capture-request", (event) => {
    document.body.insertAdjacentHTML("afterend", statusHtml);
    let icon = document.getElementById("chromeExtensionIcon");
    icon.src = chrome.runtime.getURL("intellpro-logo-small.png");
    let crossIcon = document.getElementById("chromeExtensionCross");
    crossIcon.src = chrome.runtime.getURL("cross.png");
  });

  /**
   * After processing, cleanup the status indicator and send data to the server.
   */
  addEventListener("single-file-on-after-capture-request", (event) => {
    const url = window.location.href;
    let content = event.detail.options.content;

    chrome.runtime.sendMessage(
      {
        type: "upload-file",
        contents: content,
        name: `${document.title} ${new Date().toLocaleString()}`,
        url,
      },
      (message) => {
        // Callback that runs after the upload-file message has been handled.
        const statusElement = document.querySelector(
          "#intellproExtensionStatus",
        );
        statusElement.textContent = "Save complete";

        const statusBarElement = document.querySelector(
          "#intellproExtensionStatusBar",
        );
        setTimeout(() => statusBarElement.remove(), 10000);

        if (message) {
          alert(message);
        }
      },
    );
  });
})();
