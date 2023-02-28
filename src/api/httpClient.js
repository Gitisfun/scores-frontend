import axios from "axios";

const httpClient = axios.create({
  // baseURL: "https://comagex-api.herokuapp.com/api/",
  baseURL: "https://scraper-scores.herokuapp.com/api/", // TODO: change to real api link
  timeout: 10000, // indicates, 1000ms ie. 1 second
  headers: {
    "Content-Type": "application/json",
  },
});

// httpClient.defaults.headers.common['authorization'] = `Bearer ${JSON.parse(localStorage.getItem("authtokenws"))}`

export default httpClient;
