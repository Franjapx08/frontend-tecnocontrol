import axios from "axios";
const baseDomain = process.env.VUE_APP_APIURL;
const apiVersion = process.env.VUE_APP_APIVERSION;
const baseURL = `${baseDomain}${apiVersion}`;

const api = axios.create({
  baseURL: baseURL,
  headers: { 
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

export default api;
