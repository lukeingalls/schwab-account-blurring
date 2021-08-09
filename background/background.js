(() => {
  globalThis.streamView = true;
  browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.msg === "getStreamView") {
      sendResponse({ streamView: globalThis.streamView });
    }
    if (request.msg === "setStreamView") {
      globalThis.streamView = request.streamView;
    }
  });
})();
