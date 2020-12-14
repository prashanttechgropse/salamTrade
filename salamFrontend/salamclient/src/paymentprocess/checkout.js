import React from 'react';
import './checkout.css';

function Checkout({ totalProduct, payableAmount, cartAmount }) {
  return (
    <aside className="col-right sidebar col-sm-4 wow bounceInUp animated checkout-fluid">
      <div className="block block-account">
        <div className="block-title">Price Detail</div>
        <div className="block-content">
          <ul>
            <li><a href="javascript:;">Price({totalProduct} Item)</a><span>${cartAmount}</span></li>
            <li><a href="javascript:;">Delivery Charge</a><span>$15</span></li>
            <li><a href="javascript:;">Subtotal</a><span id="spanAmountDataId">${payableAmount}
            </span></li>
          </ul>
        </div>
      </div>
    </aside>

  )
}


export default Checkout;
// export default Checkout;