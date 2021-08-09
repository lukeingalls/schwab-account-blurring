const ACCOUNT_NUM_SELECTORS = [
  ".acct-num",
  ".account-number",
  "#asAcctNumber",
  ".account.number",
  ".sdps-footer__account-number",
  ".summary-accountLink",
  ".sdps-account-selector__right-col",
];

const setInput = (input) => {
  input.addEventListener("change", (e) => {
    if (e.target.value.toUpperCase() === "GME") {
      document.querySelectorAll(".eq-ticket-toggle-button").forEach((elem) => {
        if (elem.htmlFor === "action-sell") {
          elem.classList.add("HIDE-SELL-BUTTON");
        }
      });
    } else {
      document
        .querySelector(".HIDE-SELL-BUTTON")
        ?.classList.remove("HIDE-SELL-BUTTON");
    }
  });
};

(async () => {
  try {
    const response = await browser.runtime.sendMessage({
      msg: "getStreamView",
    });

    if (response.streamView) {
      let timesToPoll = 50;
      const interval = setInterval(() => {
        for (const selector of ACCOUNT_NUM_SELECTORS) {
          const elems = document.querySelectorAll(selector);
          for (const elem of elems) {
            elem.classList.add("HIDE-ACCOUNT-NUMS");
          }
        }
        timesToPoll -= 1;
        if (timesToPoll < 1) {
          clearInterval(interval);
          console.info(`Dispatched interval ${interval}`);
        }
      }, 100);
    }
  } catch (error) {
    console.error(error);
  }
})();
