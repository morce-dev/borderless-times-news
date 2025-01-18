import { getNews, resetPage } from "./news-api.js";

const formEl = document.querySelector("#formEl");
const loadMoreBtn = document.querySelector("#loadMoreBtn");
const articlesWrapper = document.querySelector("#articlesWrapper");

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

const handleSubmit = (event) => {
  event.preventDefault();
  const searchQuery = event.target.news.value;
  const queryPage = 1;
  articlesWrapper.textContent = "";
  fetchNews(searchQuery, queryPage);
  localStorage.setItem("Search News", searchQuery);
  event.target.news.value = "";
};

const handleLoadMore = (event) => {
  event.preventDefault();
  const searchQuery = localStorage.getItem("Search News");
  const page = parseInt(loadMoreBtn.dataset.page, 10);

  //   console.log(page);
  fetchNews(searchQuery, page);
};

const fetchNews = async (searchQuery, queryPage) => {
  try {
    return await getNews(searchQuery, queryPage).then(({ data }) => {
      const { articles } = data;
      if (!searchQuery.length) return;
      articlesWrapper.insertAdjacentHTML(
        "beforeend",
        articles.map(createMarkup).join("")
      );

      // dataset
      const page = queryPage + 1;
      loadMoreBtn.dataset.page = page;
    });
  } catch (error) {
    return console.log(error);
  }
};

const createMarkup = ({ title }) => {
  return `<p>${title}</p>`;
};

formEl.addEventListener("submit", handleSubmit);
loadMoreBtn.addEventListener("click", handleLoadMore);
