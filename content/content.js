let blackList = [];

chrome.runtime.onMessage.addListener(request => {
  	blackList = request.message;
//    console.log(blackList);
  }
);

setTimeout(() => {
setInterval(deleteMsg, 200);

function deleteMsg() {
  const posts = blackList.reduce((acc, cur) => [...acc, ...document.querySelectorAll(`span[data-a-user="${cur.toLowerCase()}"]`)], []);
console.log(posts);
  posts.map(post => {
    let c1 = c2 = "";
    while (!(c1 || c2)) {
      post = post.parentElement;
      c1 = post.tagName === "LI" && post.className === "tw-full-width";
      c2 = post.tagName === "DIV" && post.className === "chat-line__message";
    }
    post.remove();
  });
}
}, 5000);






