import React from 'react';
import Sidebar from '../component/Sidebar';
import Mywishlistdetail from './mywishlistdetail.js';
import './mywishlistpage.css';

class Mywishlistpage extends React.Component {
  render() {
    return (
      <div className="main-container col2-right-layout myorder-fluid">
        <div className="container">
          <div className="row">
          <Sidebar pageSelected="mywishlist"/>
            <Mywishlistdetail />
          </div>
        </div>
      </div>

    )
  }
}

export default Mywishlistpage;