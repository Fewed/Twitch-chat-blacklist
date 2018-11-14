/*
function popup() {
		let str = document.querySelector("#input").value;
		chrome.storage.twitch = str;
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    let activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": str});
   });
}

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector("#button").addEventListener("click", popup);
});
*/

let [inp, btn] = [...document.querySelectorAll("input")];

btn.addEventListener("click", save);

function save() {
	let str = inp.value;

	chrome.storage.local.set({twitch: str}, () => {});

  sendMessage(str);
}

function sendMessage(value = "default") {
	chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
  	let activeTab = tabs[0];
  	chrome.tabs.sendMessage(activeTab.id, {"message": value});
	});
}


chrome.storage.local.get(['twitch'], result => inp.value = result.twitch || "default");

