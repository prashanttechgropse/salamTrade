import { postRequest, deleteRequest } from '../Utility/helper'

export const addToCartAPI = (url,data) => postRequest(url, data);
export const removeProductFromCartAPI = (data) => postRequest(`user/removeProduct`, data);
export const fetchMyCartAPI = (url,data) => postRequest(url, data);