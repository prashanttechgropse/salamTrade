import React from 'react';
import './orderdetailpage.css';
import Orderdetail from './orderdetail.js';
class Orderdetailpage extends React.Component {
  render() {
    return (
      <div className="main-container col2-right-layout myorder-fluid">
        <div className="container">
          <Orderdetail />
          {/* <Paymentdetail/> */}
          

        </div>
      </div>

    )
  }
}

export default Orderdetailpage