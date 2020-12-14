import { toast } from "react-toastify";
import { ProductFilters } from '../action/product.action';

const initialState = {
    pending: false,
    response: null,
    error: null,
    message: '',
    showMessage: false,
    productList: [],
    showLoader: false,
    productDetail: {},
    subCategory: '',
    similarProduct: [],
    cartQuantity: 0,
    isWishlist: 0
}

export function productReducer(state = initialState, action) {
    switch (action.type) {
        case ProductFilters.FETCH_PRODUCT_LIST_PENDING:
            return {
                ...state,
                pending: true,
                showMessage: false,
                productList: [],
                showLoader: true
            }
        case ProductFilters.FETCH_PRODUCT_LIST_SUCCESS:
            if (action.payload.productList && action.payload.productList.length === 0) {
                toast.warn('Product not available');
            }
            return {
                ...state,
                pending: false,
                productList: action.payload.productList,
                showLoader: false
            }
        case ProductFilters.FETCH_PRODUCT_LIST_FAILED:
            toast.error(action.error);
            return {
                ...state,
                pending: false,
                productList: [],
                showLoader: false
            }
        case ProductFilters.FETCH_PRODUCT_DETAIL_PENDING:
            return {
                ...state,
                pending: true,
                showMessage: false,
                productDetail: {},
                subCategory: '',
                similarProduct: [],
                showLoader: true,
                cartQuantity: 0,
                isWishlist: 0
            }
        case ProductFilters.FETCH_PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                pending: false,
                productDetail: action.payload.productData,
                subCategory: action.payload.subCategory,
                similarProduct: action.payload.similarProduct,
                cartQuantity: action.payload.cartQuantity,
                isWishlist: action.payload.isWishlist,
                showLoader: false
            }
        case ProductFilters.FETCH_PRODUCT_DETAIL_FAILED:
            toast.error(action.error);
            return {
                ...state,
                pending: false,
                productList: [],
                productDetail: {},
                subCategory: '',
                similarProduct: [],
                showLoader: false,
            }
        case ProductFilters.UPDATE_WISHLIST_PRODUCT:
            return {
                ...state,
                isWishlist: action.payload.isWishlist
            }
        case ProductFilters.UPDATE_CART_PRODUCT:
            return {
                ...state,
                cartQuantity: action.payload.cartQuantity
            }
        default:
            return state;
    }
}