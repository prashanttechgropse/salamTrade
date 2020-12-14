import { combineReducers } from 'redux';
import { cartReducer } from '../reducer/cart.reducer';
import { wishlistReducer } from '../reducer/wishlist.reducer';
import { userReducer } from '../reducer/user.reducer';
import { productReducer } from '../reducer/product.reducer';
import chatReducer from '../component/chat/ChatReducer';

export default combineReducers({
    cart: cartReducer,
    wishlist: wishlistReducer,
    inititateState: userReducer,
    product: productReducer,
    chatUi : chatReducer
})