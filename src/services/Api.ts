import axios from "axios";

const API = () => {
  return axios.create({
    baseURL: "http://13.213.11.166:8000/",
  });
};

export default API;
