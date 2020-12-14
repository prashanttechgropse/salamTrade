import { addToWishlistAPI } from '../api/wishlist.api'
import { updateWishlistForProduct } from './product.action'
export const WishlistFilters = {
    USER_REQUIRED: 'USER_REQUIRED',
    WISHLIST_UPDATE_PENDING: 'WISHLIST_UPDATE_PENDING',
    WISHLIST_UPDATE_SUCCESS: 'WISHLIST_UPDATE_SUCCESS',
    WISHLIST_UPDATE_FAILED: 'WISHLIST_UPDATE_FAILED'
}

export const updateWishlistPending = () => ({
    type: WishlistFilters.WISHLIST_UPDATE_PENDING
})

export const updateWishlistCompleted = data => ({
    type: WishlistFilters.WISHLIST_UPDATE_SUCCESS,
    payload: data
})

export const updateWishlistFailed = (error) => ({
    type: WishlistFilters.WISHLIST_UPDATE_FAILED,
    error
})
const userAuthRequired = () => ({
    type: WishlistFilters.USER_REQUIRED
})

export const addToWishlistAction = (data) => {
    return dispatch => {
        if (data.userId === undefined)
            return dispatch(userAuthRequired())

        dispatch(updateWishlistPending())
        addToWishlistAPI('user/addToWishlist', data)
            .then(response => {
                dispatch(updateWishlistForProduct(response.data))
                dispatch(updateWishlistCompleted(response.data))
            })
            .catch(error => {
                dispatch(updateWishlistFailed(error))
            })
    }
}
