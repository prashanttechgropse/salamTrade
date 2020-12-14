import { toast } from "react-toastify";
import { WishlistFilters } from '../action/wishlist.action';

const initialState = {
    pending: false,
    response: null,
    error: null,
    message: '',
    showMessage: false
}

export function wishlistReducer(state = initialState, action) {
    switch (action.type) {
        case WishlistFilters.WISHLIST_UPDATE_PENDING:
            return {
                ...state,
                pending: true,
                showMessage: false
            }
        case WishlistFilters.WISHLIST_UPDATE_SUCCESS:
            toast.success(action.payload.message);
            return {
                ...state,
                pending: false,
                response: action.payload,
            }
        case WishlistFilters.WISHLIST_UPDATE_FAILED:
            toast.error(action.error);
            return {
                ...state,
                pending: false
            }
        case WishlistFilters.USER_REQUIRED:
            toast.warn("Need to login to continue");
            return {
                ...state
            }
        default:
            return state;
    }
}