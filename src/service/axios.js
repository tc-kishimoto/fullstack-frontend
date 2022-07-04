import axios from "axios";

const useAxios = () => {
  const token = localStorage.getItem('access_token');
  
  const instance = axios.create();
  instance.defaults.baseURL = process.env.REACT_APP_API_URL;
  instance.defaults.withCredentials = true;
  instance.interceptors.request.use(request => {
    if (token) {
      request.headers["Authorization"] = "Bearer " + token;
    }
    return request
  })

  return instance
}

export { useAxios }