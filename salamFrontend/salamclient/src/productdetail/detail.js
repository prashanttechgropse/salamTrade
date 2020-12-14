import React from 'react';
import { useSelector } from 'react-redux';
import './detail.css';
import Productslider from './productslider.js';
import Description from './description.js';
import Loader from 'react-loader-spinner';

function Detail() {
  const subCategory = useSelector(store => store.product.subCategory);
  const productDetail = useSelector(store => store.product.productDetail);
  return (
    <section className="main-container col1-layout">
      <div className=" container">
        <div className="col-main">
          <div className="breadcrumbs">
            <div className="row">
              <ul>
                <li className="home"> <a href="/" title="Go to Home Page">Home</a><span>/</span></li>
                {/* <li className="category13">{subCategory} <span>/</span></li> */}
                <li className="category13">{productDetail.productName}</li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="product-view productdetail-fluid">
              {subCategory.length > 0 ?
                <div className="product-essential">
                  <Productslider />
                  <Description />
                </div> : <Loader type="Bars" color="#2480fe" height={80} width={80} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Detail;