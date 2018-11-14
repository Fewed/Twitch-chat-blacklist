chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	let str = request.message;
    console.log(str);
	//	localStorage.gmail = str;
  }
);

