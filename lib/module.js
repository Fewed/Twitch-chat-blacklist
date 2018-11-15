export default function sendMessage(value = []) {
	chrome.tabs.query({currentWindow: true, active: true}, tabs => {
  	const activeTab = tabs[0];
  	chrome.tabs.sendMessage(activeTab.id, {"message": value});
	});
}
