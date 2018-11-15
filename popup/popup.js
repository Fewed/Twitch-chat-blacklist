import sendMessage from "../lib/module.js";

const [ta, btn, img] = [...document.body.children];

btn.addEventListener("click", saveSettings);
ta.addEventListener("focus", () => setTimeout(() => {
	ta.selectionStart = ta.selectionEnd = 0;
	ta.scrollTo(0, 0);
}), 0);

ta.setAttribute("placeholder", [...Array(10)].reduce(acc => acc + "\nusername", ""));
chrome.storage.local.get(["twitch"], result => {
	const list = result.twitch || [];
	if (list.toString()) ta.value = "\n" + list.join("\n");
});

function saveSettings() {
	updateText();
	toggleButton();
}

function updateText() {
	let [str, temp] = [ta.value, []];
	str = str.replace(/[,;]/g, "\n")
						.split("\n")
						.map(item => item.trim())
						.filter(item => item)
						.sort((a,b) => a > b ? 1 : -1)
						.map(item => temp[temp.push(item)-1])
						.join("\n");
	ta.value = "\n" + str;
//	console.log(temp);
	chrome.storage.local.set({twitch: temp}, () => {});
  sendMessage(temp);
}

function toggleButton(delay = 1) {
	[btn, img].map(item => item.classList.toggle("hide"));

	setTimeout(() => {
		[btn, img].map(item => item.classList.toggle("hide"));
		ta.focus();
	}, 1000*delay);
}
