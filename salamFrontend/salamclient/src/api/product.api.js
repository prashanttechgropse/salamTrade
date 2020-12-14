import { postRequest } from '../Utility/helper'

export const fetchProductListAPI = (url,data) => postRequest(url, data);
export const fetchProductDetailAPI = (url,data) => postRequest(url, data)