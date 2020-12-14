import { postRequest } from '../Utility/helper'

export const userLoginAPI = (url,data) => postRequest(url, data)