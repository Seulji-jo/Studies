const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

function getData(url) {
  ajax.open("GET", url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

const newsFeed = getData(NEWS_URL);

const $ul = document.createElement("ul");

window.addEventListener("hashchange", function () {
  const id = location.hash.slice(1);
  console.log(id);

  const newsContent = getData(CONTENT_URL.replace("@id", id));

  container.innerHTML = `
    <h1>${newsContent.title}</h1>
    <div>
      <a href="#">목록으로</a>
    </div>
  `;
});

const newsList = [];

newsList.push("<ul>");
newsFeed.map((news) => {
  newsList.push(`
  <li>
    <a href="#${news.id}">
      ${news.title} (${news.comments_count})
    </a>
  </li>
  `);
});
newsList.push("</ul>");

container.innerHTML = newsList.join("");
