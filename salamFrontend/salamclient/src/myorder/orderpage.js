import React from 'react';
import './orderpage.css';
import Sidebar from '../component/Sidebar';
import Orderlist from './orderlist.js';
class Orderpage extends React.Component {
  render() {
    return (
      <div className="main-container col2-right-layout myorder-fluid">
        <div className="container">
          <div className="row">
            <Sidebar pageSelected="myorder"/>
            <Orderlist />
          </div>
        </div>
      </div>
    )
  }
}

export default Orderpage;