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
        console.log(
            currentVersion + " is not " + desiredVersion + " so navigating to " + prefix + desiredVersion + suffix
        );
        window.location.replace(prefix + desiredVersion + suffix);
    } else {
        console.log("All good, we're on the Django docs version that we want.");
    }
}

chrome.storage.sync.get("disabled", function(disabledResult) {
    if (disabledResult !== undefined && disabledResult.disabled) {
        console.log("Remember Django Version is disabled.");
        return;
    }
    chrome.storage.sync.get("version", function(result) {
        if (result.version === undefined) {
            console.log("No current Django docs version is set.");
        } else {
            console.log("Current Django version set to " + result.version);
            ensureVersion(result.version);
        }
    });
})

const versionsUl = document.getElementById("doc-versions");
if (versionsUl !== null) {
    for (let i = 0; i < versionsUl.children.length; i++) {
        let li = versionsUl.children[i];
        if (li.className !== "other") {
            continue;
        }
        let anchor = li.children[0];
        anchor.onclick = function() {
            chrome.storage.sync.set({version: anchor.innerText}, function() {
                console.log("Django version set to " + anchor.innerText);
            });
            return true;
        }
    }
}