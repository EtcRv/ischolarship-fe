import axios from "axios";

const API = () => {
  return axios.create({
    baseURL: "http://13.212.143.20:8000/",
  });
};

export default API;
