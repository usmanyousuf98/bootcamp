import axios, { Axios } from "axios";
import { getToken } from "../token";

export const instanceAuth = axios.create({
  baseURL: "http://localhost:8080/", //dev url
});
console.log("hello");
instanceAuth.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// export const instanceLogIn = axios.create({
//   baseURL: "http://localhost:8080/", //dev url
// });
// console.log("hello");
// instanceLogIn.interceptors.response.use(
//   function (response) {
//     return response.data;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );
export const instanceFetch = axios.create({
  baseURL: "http://localhost:8080/", //dev url
  headers: {
    "Content-Type": "application/json",
  },
});
instanceFetch.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instanceFetch.interceptors.response.use(
  function (response) {
    return response.data.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// try {
//   const token = localStorage.getItem(token);
// } catch (error) {
//   console.log(error);
// }

// export const instanceFetch = axios.create({
//   baseURL: "http://localhost:8080",
//   headers: "Bearer " + token,
// });
// instanceFetch.interceptors.create({
//   function(response) {
//     return response.data;
//   },
//   function(error) {
//     return Promise.reject(error);
//   },
// });
