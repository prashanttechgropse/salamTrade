import React from 'react';
import './processbar.css';
class Processbar extends React.Component {
  render() {
    return (
      <div className="processbar-fluid">
        <ul>
          <li className="success"><a href="javascript:;">My Shopping Cart</a></li>
          <li className="active"><a href="javascript:;">Delivery Address</a></li>
          <li><a href="javascript:;">Payment</a></li>
        </ul>
      </div>
    )
  }
}

export default Processbar;