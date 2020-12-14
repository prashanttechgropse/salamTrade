import React from 'react';

import './deliverypage.css';
import Processbar from './processbar.js';
import Addressdetail from './addressdetail.js';
import Checkout from './checkout.js';
class Deliverypage extends React.Component{
	render()
	{
		return(

  <div className="main-container col2-right-layout myorder-fluid">
    <div className="container">
      <div className="row">
              <Processbar/>
              <Addressdetail/>
              <Checkout/>
      </div>
    </div>
  </div>

			)
	}
}

export default Deliverypage