import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { toast } from 'react-toastify';
import Home from './home.js';
import Productlist from './productlist.js';
import Productdetail from './productdetail.js';
import Myorders from './myorders.js';
import orderdetail from './orderdetail';
import Myprofile from './myprofile.js';
import Shoppingcart from './shoppingcart.js';
import Deliveryaddress from './deliveryaddress.js';
import Paymentprocess from './paymentprocess.js';
import Forgotpassword from './forgotpassword.js';
import Slid from './Slid';
import { loadState, saveState } from './Authentication/localStorage';
import reducers from './reducer/reducer';
import Signup from './signup';
import Login from './login';
import Sidebar from './productlist/sidebar';
import Mywishlist from './mywishlist';
import MyWallet from './MyWallet'
import PrivacyPolicy from './page/PrivacyPolicy/index';
import ReturnPolicy from './page/returnPolicy';
import Security from './page/Security';
import SiteMap from './page/SiteMap';
import TermOfUse from './page/TermOfUse';
import Dashboard from './page/Dashboard';
import AboutUs from './page/about-us/index';
import ContactUs from './page/contact-us/index';
import AppRoute from './AppRoute';
import SocketController from './component/chat/SocketController';
import AppLayout from './component/AppLayout';
import 'react-toastify/dist/ReactToastify.css';

// Call it once in your app. At the root of your app is the best place
toast.configure()

const persistedState = loadState();
const store = createStore(
  reducers,
  persistedState,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

store.subscribe(() => {
  saveState(store.getState());
});

const Apps = () => {
  return (
    <Provider store={store}>
      <SocketController />
      <Router>
        <AppLayout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Productlist" component={Productlist} />
            <Route path="/Productdetail" component={Productdetail} />
            <Route path="/Myorders" component={Myorders} />
            <Route path="/orderdetail" component={orderdetail} />
            <Route path="/Myprofile" component={Myprofile} />
            <Route path="/Shoppingcart" component={Shoppingcart} />
            <Route path="/Deliveryaddress" component={Deliveryaddress} />
            <Route path="/Paymentprocess" component={Paymentprocess} />
            <Route path="/Forgotpassword" component={Forgotpassword} />
            <Route path="/Mywishlist" component={Mywishlist} />
            <Route path="/Slid" component={Slid} />
            <Route path="/Signup" component={Signup} />
            <Route path="/Login" component={Login} />
            <Route path="/mywallet" component={MyWallet} />
            <Route path="/Sidebar" component={Sidebar} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/return-policy" component={ReturnPolicy} />
            <Route path="/security" component={Security} />
            <Route path="/sitemap" component={SiteMap} />
            <Route path="/term-of-use" component={TermOfUse} />
            <Route path="/dashboard" component={Dashboard}></Route>
            <AppRoute path="/about-us" component={AboutUs} />
            <AppRoute path="/contact-us" component={ContactUs} />
          </Switch>
        </AppLayout>
      </Router>
    </Provider>
  );
}
export default Apps;
