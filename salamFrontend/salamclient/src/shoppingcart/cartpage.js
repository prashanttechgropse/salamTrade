import React from 'react';
import './cartpage.css';
import Cartdetail from './cartdetail.js';
import Processbar from './processbar.js';
class Cartpage extends React.Component {
  render() {
    return (
      <div className="main-container col2-right-layout myorder-fluid">
        <div className="container">
          <div className="row">
            <Processbar />
            <Cartdetail />
            {/* <Checkout/> */}
          </div>
        </div>
      </div>

    )
  }
}

export default Cartpage