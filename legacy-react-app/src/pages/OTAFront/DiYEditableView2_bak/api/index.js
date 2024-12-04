import axios from "axios";

const baseURL = "https://halaltravel.ai/ht";

const axiosInstance = axios.create({
  baseURL,
});


const httpMethods = {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
  baseURL: baseURL
};

export default httpMethods;


