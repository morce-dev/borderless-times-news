const axios = require("axios");
const BASE_URL = "https://newsapi.org/v2/everything";
const API_KEY = "";

export const getNews = async (searchQuery, queryPage) => {
  try {
    const searchParams = new URLSearchParams({
      pageSize: 5,
      language: "en",
    });
    const response = await axios.get(
      `${BASE_URL}?q=${searchQuery}&${searchParams.toString()}&page=${queryPage}`,
      {
        headers: {
          "X-Api-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    return console.log(error);
  }
};

export const resetPage = () => {
  return 1;
};
