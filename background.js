chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {

    function sendMessage(value = "default") {
			chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
		  	let activeTab = tabs[0];
		  	chrome.tabs.sendMessage(activeTab.id, {"message": value});
			});
		}


		chrome.storage.local.get(['twitch'], result => sendMessage(result.twitch));

  }
})











