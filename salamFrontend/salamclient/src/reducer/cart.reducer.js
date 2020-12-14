import { toast } from "react-toastify";
import { CartFilters } from '../action/cart.action';

const initialState = {
    pending: false,
    cartTotal: null,
    error: null,
    cartDetail: {}
}

export function cartReducer(state = initialState, action) {
    switch (action.type) {
        case CartFilters.CART_UPDATE_PENDING:
            return {
                ...state,
                pending: true
            }
        case CartFilters.CART_UPDATE_SUCCESS:
            if (action.payload.message !== undefined)
                toast.success(action.payload.message)

            return {
                ...state,
                pending: false,
                cartTotal: action.payload.cartTotal
            }
        case CartFilters.CART_UPDATE_FAILED:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case CartFilters.FETCH_CART_PENDING:
            return {
                ...state,
                pending: true
            }
        case CartFilters.FETCH_CART_SUCCESS:
            return {
                ...state,
                pending: false,
                cartDetail: action.payload
            }
        case CartFilters.FETCH_CART_FAILED:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case CartFilters.USER_REQUIRED:
            return {
                ...state
            }
        default:
            return state;
    }
}