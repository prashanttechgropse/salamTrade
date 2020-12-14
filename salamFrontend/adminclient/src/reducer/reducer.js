import { combineReducers } from 'redux';
import chatReducer from '../component/chat/ChatReducer'

function inititateState(state = { authenticateState: '' }, action) {
    if (action.type === 'authenticate') {
        return {
            authenticateState: action.payload,
            userId: action.userId,
            email: action.email,
            name: action.name,
            mobile: action.mobile,
            image: action.image,
            vendorId: action.vendorId,
            adminStatus: action.adminStatus,
            address: action.address,
            accountType: action.accountType,
            city: action.city,
            streetName: action.streetName,
            storeEmail: action.storeEmail,
            storeName: action.storeName,
            // featured   : action.featured,
        }
    }
    return state;
}

function productReduce(state = { productState: '' }, action) {
    if (action.type === 'product') {
        return {
            // productState : action.payload,
            name: action.name,
            storeName: action.storeName,
            productId: action.productId,
            productName: action.productName,
            productPrice: action.productPrice,
            discount: action.discount,
            category: action.category,
            subCategory: action.subCategory,
            brandName: action.brandName,
            quantity: action.quantity,
            aboutProduct: action.aboutProduct,
            file: action.file,
            file1: action.file1,
            file2: action.file2,
            file3: action.file3,
            file4: action.file4,

            // userId : action.userId,
        }
    }
    return state;
}

const appReducer = combineReducers({
    inititateState,
    productReduce,
    chatUi: chatReducer
})

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        localStorage.clear();
        window.location = "/"
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer;