import React from 'react';

import './orderlist.css';
import './orderdatatable.css';
import Orderdatatable from './orderdatatable.js';
class Orderlist extends React.Component {
  render() {
    return (
      <section className="col-main col-sm-9  wow bounceInUp animated orderist-fluid">
        <div className="category-title">
          <h1>My Order</h1>
          <div className="breadcrumbs">
            <div className="row">
              <ul>
                <li className="home"> <a href="javascript:;" title="Go to Home Page">Home</a><span>/</span></li>
                <li className=""> <a href="javascript:;" title="Go to Home Page">My Account</a><span>/</span></li>
                <li className="category13"> My Order</li>
              </ul>
            </div>
          </div>
          <div className="orderdatatable">
            <Orderdatatable />
          </div>


        </div>
      </section>


    )
  }
}

export default Orderlist;