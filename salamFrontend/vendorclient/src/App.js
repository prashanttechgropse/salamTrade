import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { loadState, saveState } from './Authentication/localStorage';
import Login from './login.js';
import Register from './register.js';
import Forgotpassword from './forgotpassword.js';
import Changepassword from './changepassword.js';
import Dashboard from './dashboard';
import Profile from './profile.js';
import Createprofile from './createprofile.js';
import Orderlist from './orderlist.js';
import Productlist from './productlist.js';
import Productdetail from './productdetail.js';
import Orderdetail from './orderdetail.js';
import Addnewproduct from './addnewproduct.js';
import Editproductpage from './editProduct';
import reducers from './reducer/reducer';
// import DataTable from './DataTable';
// import Modal from './Modal';
import Pass from './pass';
import Map from './map';
import SocketController from './component/chat/SocketController'

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

function App() {
  return (
    <Provider store={store}>
      <SocketController />
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/Register" component={Register} />
        <Route path="/Forgotpassword" component={Forgotpassword} />
        <Route path="/Changepassword" component={Changepassword} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/Profile" component={Profile} />
        <Route path="/Createprofile" component={Createprofile} />
        <Route path="/Orderlist" component={Orderlist} />
        <Route path="/Productlist" component={Productlist} />
        <Route path="/Productdetail" component={Productdetail} />
        <Route path="/Orderdetail" component={Orderdetail} />
        <Route path="/Addnewproduct" component={Addnewproduct} />
        <Route path="/Editproductpage" component={Editproductpage} />
        {/* <Route  path = "/DataTable" component = {DataTable}/> */}
        {/* <Route  path = "/Modal" component = {Modal} /> */}
        <Route path="/Pass" component={Pass} />
        <Route path="/Map" component={Map} />
      </Router>
    </Provider>

  );
}

export default App;
