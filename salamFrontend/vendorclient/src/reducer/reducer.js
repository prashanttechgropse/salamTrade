import { combineReducers } from 'redux';
import chatReducer from '../component/chat/ChatReducer'

function inititateState(state = { authenticateState: '' }, action) {
    if (action.type === 'authenticate') {
        return {
            authenticateState: action.payload,
            name: action.name,
            email: action.email,
            image: action.image,
            type: action.Type,
            userId: action.userId,
            mobile: action.mobile,
            storeName: action.storeName,
            storeEmail: action.storeEmail,
            storeMobile: action.storeMobile,
            streetName: action.streetName,
            address: action.address,
            lat: action.lat,
            lng: action.lng,
            city: action.city,
            zipCode: action.zipCode,
            // productId   : action.productId,
        }
    }
    return state;
}

function productReduce(state = { productState: "" }, action) {
    if (action.type === 'product') {
        return {
            // product : action.product,
            name: action.name,
            productId: action.productId,
            file1: action.file1,
            file2: action.file2,
            file3: action.file3,
            file4: action.file4,
            productName: action.productName,
            productPrice: action.productPrice,
            discount: action.discount,
            businesscategory: action.businesscategory,
            category: action.category,
            subCategory: action.subCategory,
            brandName: action.brandName,
            quantity: action.quantity,
            aboutProduct: action.aboutProduct,
            storeName: action.storeName,
        }
    }
    return state;
}

function editProductReduce(state = { editProductState: "" }, action) {
    // console.log('reducer',action);
    if (action.type === 'editproduct') {
        return {
            product: action.product,
            productId: action.productId,
            file: action.file,
            productName: action.productName,
            productPrice: action.productPrice,
            discount: action.discount,
            businesscategory: action.businesscategory,
            category: action.category,
            subCategory: action.subCategory,
            brandName: action.brandName,
            quantity: action.quantity,
            aboutProduct: action.aboutProduct,
        }
    }
    return state;
}

const appReducer = combineReducers({
    inititateState,
    productReduce,
    editProductReduce,
    chatUi: chatReducer
})

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        localStorage.clear();
        return window.location = "/"
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer;