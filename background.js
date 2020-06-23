function showIconIfOnDjangoDocs(tabId, changeInfo, tab) {
  if (tab === undefined) {
    return;
  }
  if (~tab.url.indexOf("docs.djangoproject.com")) {
    chrome.pageAction.show(tabId);
  }
}

chrome.tabs.onUpdated.addListener(showIconIfOnDjangoDocs);
