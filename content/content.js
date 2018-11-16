let blackList = [];

chrome.runtime.onMessage.addListener(request => blackList = request.message);

waitPoists().then(updateChat);


function waitPoists(posts = 10, period = 1, timeout = 5) {
  return new Promise(resolve => {
    let cnt = 0;
    const loop = () => {
      if (++cnt % 60*period) requestAnimationFrame(loop);
      else {
        const nums = document.querySelectorAll("li.tw-full-width, div.chat-line__message");
        (nums.length < posts && cnt < 60*timeout) ? requestAnimationFrame(loop) : resolve();
      }
    };
    loop();
  });
}


function updateChat(period = 0.2) {
  let cnt = 0;
  const loop = () => {
    if (++cnt % 60*period) requestAnimationFrame(loop);
    else {
      hideMsg();
      requestAnimationFrame(loop);
    }
  };
  loop();
}


function hideMsg() {
  const posts = blackList.reduce((acc, cur) => [...acc, ...document.querySelectorAll(`span[data-a-user="${cur.toLowerCase()}"]`)], []);

  posts.map(post => {
    let c1 = c2 = "";
    while (!(c1 || c2)) {
      if (post === document.body) break;
      post = post.parentElement;
      c1 = post.tagName === "LI" && post.className === "tw-full-width";
      c2 = post.tagName === "DIV" && post.className === "chat-line__message";
    }
    if (post !== document.body) post.style.display = "none";
  });
}

