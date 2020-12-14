import { postRequest } from '../Utility/helper'

export const addToWishlistAPI = (url,data) => postRequest(url, data)