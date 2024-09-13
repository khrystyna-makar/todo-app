import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ApiClient = axios;
export default ApiClient 