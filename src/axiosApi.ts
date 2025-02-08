import axios from "axios";
import {BASE_URL} from './globalConstants';

console.log("Базовый URL:", BASE_URL);

const axiosApi = axios.create({
    baseURL: BASE_URL,
});

export default axiosApi;