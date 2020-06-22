function setButton() {
  const button = document.getElementById("en_disable");
  if (button !== null) {
    chrome.storage.sync.get("disabled", function (result) {
      let disabled;
      if (result !== undefined && result.disabled) {
        disabled = true;
        button.innerText = "Enable";
      } else {
        disabled = false;
        button.innerText = "Disable";
      }
      button.onclick = function () {
        chrome.storage.sync.set({ disabled: !disabled }, function () {
          const enDisabledText = disabled ? "enabled" : "disabled";
          console.log("Remember Django Version is now " + enDisabledText);
          setButton();
        });
      };
    });
  }
}

window.onload = function () {
  setButton();
  chrome.storage.sync.get("version", function (result) {
    const versionSpan = document.getElementById("current_version");
    versionSpan.innerText = result === undefined ? "unset" : result.version;
  });
};
