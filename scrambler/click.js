function click(e) {
	chrome.tabs.executeScript(null, {file: "scramble.js"});
}

chrome.browserAction.onClicked.addListener(click);
