import axios from "axios";
import { instanceAuth, instanceFetch } from "../axios/http";

const signUpApi = async (name, email, password) => {
  return instanceAuth({
    url: "/api/v1/users/signup",
    method: "post",
    data: { name, email, password },
  }).then((data) => {
    console.log(data);
    return data;
  });
};

const loginApi = async (email, password) => {
  return instanceAuth({
    url: "/api/v1/users/login",
    method: "post",
    data: { email, password },
  }).then((data) => {
    console.log(data);
    return data;
  });
};

const activityCreateApi = async (
  name,
  description,
  activityType,
  duration,
  date
) => {
  return instanceFetch({
    url: "/api/v1/activity/create",
    method: "post",
    data: { name, description, activityType, duration },
  }).then((data) => {
    console.log(data);
    return data;
  });
};

const fetchDataApi = async () => {
  return instanceFetch({
    url: "/api/v1/activity",
    method: "get",
  }).then((data) => {
    return data;
  });
};

const deleteDataApi = async (id) => {
  return instanceFetch({
    url: "/api/v1/activity/delete",
    method: "delete",
    data: { id },
  }).then((data) => {
    return data;
  });
};

const activityUpdateApi = async (
  id,
  name,
  description,
  activityType,
  duration,
  date
) => {
  return instanceFetch({
    url: "/api/v1/activity/update",
    method: "put",
    data: { id, name, description, activityType, duration, date },
  }).then((data) => {
    console.log(data);
    return data;
  });
};

//   e.preventDefault();

// try {
//   const response = await axios.get("/api/v1/recipes/1");

//   // Process the response data as needed
//   console.log(response);

//   // Clear the form
//   // setEmail("");
//   // setPassword("");
// } catch (error) {
//   // Handle error
//   console.error(error);
// }

export {
  loginApi,
  signUpApi,
  fetchDataApi,
  activityCreateApi,
  deleteDataApi,
  activityUpdateApi,
};
