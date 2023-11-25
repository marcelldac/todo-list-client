import axios from "axios";

export const api = axios.create({
  baseURL: "https://todolist-api-hdhx.onrender.com/",
});
