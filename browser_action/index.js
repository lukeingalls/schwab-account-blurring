const getStreamViewState = async () => {
  try {
    const response = await browser.runtime.sendMessage({
      msg: "getStreamView",
    });

    document.querySelector("#stream-view").checked = response.streamView;
  } catch (error) {
    console.error(error);
  }
};

(() => {
  getStreamViewState();

  document.querySelector("#stream-view")?.addEventListener("change", (e) => {
    browser.runtime.sendMessage({
      msg: "setStreamView",
      streamView: e.target.checked,
    });
  });
})();
