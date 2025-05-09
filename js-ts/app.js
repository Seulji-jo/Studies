const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

ajax.open("GET", NEWS_URL, false);
ajax.send();

const newsFeed = JSON.parse(ajax.response);

const $ul = document.createElement("ul");

window.addEventListener("hashchange", function () {
  const id = location.hash.substring(1);

  ajax.open("GET", CONTENT_URL.replace("@id", id), false);
  ajax.send();

  const newsContent = JSON.parse(ajax.response);
  const title = document.createElement("h1");

  title.innerHTML = newsContent.title;

  content.appendChild(title);
});

newsFeed.map((news) => {
  const $div = document.createElement("div");

  $div.innerHTML = `
  <li>
    <a href="#${news.id}">
      ${news.title} (${news.comments_count})
    </a>
  </li>
  `;

  $ul.appendChild($div.firstElementChild);
});

container.appendChild($ul);
container.appendChild(content);
