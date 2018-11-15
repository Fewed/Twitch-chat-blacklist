import sendMessage from "../lib/module.js";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
		chrome.storage.local.get(["twitch"], result => sendMessage(result.twitch));
  }
})