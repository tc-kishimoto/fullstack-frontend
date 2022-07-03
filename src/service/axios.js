import axios from "axios";

const instance = axios.create();
instance.defaults.baseURL = process.env.REACT_APP_API_URL;
instance.defaults.withCredentials = true;

export { instance as axios}