let blackList = [];

chrome.runtime.onMessage.addListener(request => {
  	blackList = request.message;
    console.log(blackList);
  }
);

setInterval(deleteMsg, 200);

function deleteMsg() {
  const posts = blackList.reduce((acc, cur) => [...acc, ...document.querySelectorAll(`span[data-a-user="${cur.toLowerCase()}"]`)], []);

  posts.map(post => {
    while (!(post.tagName === "LI" && post.className === "tw-full-width")) post = post.parentElement;
    post.remove();
  });
}







