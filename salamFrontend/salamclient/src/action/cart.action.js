import { addToCartAPI, removeProductFromCartAPI, fetchMyCartAPI } from '../api/cart.api'
import { updateAddCartForProduct } from './product.action'
export const CartFilters = {
    USER_REQUIRED: 'USER_REQUIRED',
    CART_UPDATE_PENDING: 'CART_UPDATE_PENDING',
    CART_UPDATE_SUCCESS: 'CART_UPDATE_SUCCESS',
    CART_UPDATE_FAILED: 'CART_UPDATE_FAILED',
    FETCH_CART_PENDING: 'FETCH_CART_PENDING',
    FETCH_CART_SUCCESS: 'FETCH_CART_SUCCESS',
    FETCH_CART_FAILED: 'FETCH_CART_FAILED',
}

export const updateCartCount = data => ({
    type: CartFilters.CART_UPDATE_SUCCESS,
    payload: data
})

const userAuthRequired = () => ({
    type: CartFilters.USER_REQUIRED
})

export const addToCartAction = (data) => {
    return dispatch => {
        if (data.userId === undefined)
            return dispatch(userAuthRequired())

        addToCartAPI('user/addToCart', data)
            .then(response => {
                dispatch(updateCartCount(response.data));
                dispatch(updateAddCartForProduct(response.data));
                
                let subTotalCartAmount = 0;
                let totalCartItem = 0;
                const myCart = response.data.myCart;

                if (Array.isArray(myCart)) {
                    myCart.map(item => {
                        subTotalCartAmount += parseFloat(item.total)
                        totalCartItem += parseInt(item.quantity)
                        return item;
                    })
                }
                dispatch(fetchCartCompleted({
                    myCart,
                    subTotalCartAmount,
                    totalCartAmount: subTotalCartAmount + 15,
                    totalCartItem
                }))
            })
            .catch(error => {
            })
    }
}

export const removeProductFromCartAction = (data) => {
    return dispatch => {
        removeProductFromCartAPI(data)
            .then(response => {
                let subTotalCartAmount = 0;
                let totalCartItem = 0;
                if (Array.isArray(response.data.product)) {
                    response.data.product.map(item => {
                        subTotalCartAmount += parseFloat(item.total)
                        totalCartItem += parseInt(item.quantity)
                        return item;
                    })
                }
                dispatch(fetchCartCompleted({
                    myCart: response.data.product,
                    subTotalCartAmount,
                    totalCartAmount: subTotalCartAmount + 15,
                    totalCartItem
                }));
                dispatch(updateCartCount(response.data))
            })
            .catch(error => {
                dispatch(fetchCartFailed(error))
            })
    }
}

const fetchCartPending = () => ({
    type: CartFilters.FETCH_CART_PENDING
})

const fetchCartCompleted = (payload) => ({
    type: CartFilters.FETCH_CART_SUCCESS,
    payload
})

const fetchCartFailed = (error) => ({
    type: CartFilters.FETCH_CART_FAILED,
    error
})

export const fetchMyCartAction = (data) => {
    return dispatch => {
        if (data.userId === undefined)
            return dispatch(userAuthRequired())

        dispatch(fetchCartPending());

        fetchMyCartAPI('user/myCart', data)
            .then(response => {
                let subTotalCartAmount = 0;
                let totalCartItem = 0;
                if (Array.isArray(response.data.product)) {
                    response.data.product.map(item => {
                        subTotalCartAmount += parseFloat(item.total)
                        totalCartItem += parseInt(item.quantity)
                        return item;
                    })
                }
                dispatch(fetchCartCompleted({
                    myCart: response.data.product,
                    subTotalCartAmount,
                    totalCartAmount: subTotalCartAmount + 15,
                    totalCartItem
                }));
            })
            .catch(error => {
                dispatch(fetchCartFailed(error))
            })
    }
}
