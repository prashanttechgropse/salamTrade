import React from 'react';

import './checkout.css';
class Checkout extends React.Component{
	render()
	{
		return(
        <aside className="col-right sidebar col-sm-3 wow bounceInUp animated checkout-fluid">
          <div className="block block-account">
            <div className="block-title">Price Detail</div>
            <div className="block-content">
              <ul>
                <li><a href="javascript:;">Price(3 Item)</a><span>$550</span></li>
                <li><a href="javascript:;">Delivery Charge</a><span>$15</span></li>
                <li><a href="javascript:;">Subtotal</a><span>$565</span></li>
              </ul>
            <div className="checkouts"><a onClick={()=>this.props.history.push('Deliveryaddress')}>Checkout</a></div>
            </div>
          </div>
        </aside>
			)
	}
}

export default Checkout;