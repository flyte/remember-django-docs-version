function getCurrentUrlDetails() {
  const urlParams = window.location.href.match(
    /(.+docs\.djangoproject\.com\/.+?\/)(.+?)(\/.*)/
  );
  if (urlParams === null) {
    console.error("Django docs URL did not match regex");
    return;
  }
  return [urlParams[1], urlParams[2], urlParams[3]];
}

function ensureVersion(desiredVersion) {
  const [prefix, currentVersion, suffix] = getCurrentUrlDetails();
  if (currentVersion !== desiredVersion) {
    window.location.replace(prefix + desiredVersion + suffix);
  }
}

chrome.storage.sync.get("disabled", function (disabledResult) {
  if (disabledResult !== undefined && disabledResult.disabled) {
    return;
  }
  chrome.storage.sync.get("version", function (result) {
    if (result.version !== undefined) {
      ensureVersion(result.version);
    }
  });
});

const versionsUl = document.getElementById("doc-versions");
if (versionsUl !== null) {
  for (let i = 0; i < versionsUl.children.length; i++) {
    let li = versionsUl.children[i];
    if (li.className !== "other") {
      continue;
    }
    let anchor = li.children[0];
    anchor.onclick = function () {
      chrome.storage.sync.set({ version: anchor.innerText }, function () {
        console.log("Django version set to " + anchor.innerText);
      });
      return true;
    };
  }
}
