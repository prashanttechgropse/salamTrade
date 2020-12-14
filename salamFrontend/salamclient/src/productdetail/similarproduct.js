import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './similarproduct.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Loader from 'react-loader-spinner'

function Similarproduct() {
  const similarProduct = useSelector(store => store.product.similarProduct);


  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div>
      <section className="main-container col1-layout home-content-container categories-fluid">
        <div className="container">
          {/* <Loader visible={this.state.visible} type="Puff" className="signuploader" /> */}
          <div className="std">
            <div className="best-seller-pro wow bounceInUp animated">
              <div className="slider-items-products">
                <div className="new_title center">
                  <div className="new_title center">
                    <h2>Similar Product's</h2>
                  </div>
                  <br />
                  <Carousel
                    responsive={responsive}
                    autoPlaySpeed={1000}
                    containerClass="carousel-container"
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px">
                    {
                      similarProduct.map((e, i) => {
                        return (
                          <React.Fragment key={i}>
                            <div className="categoryslider">
                              <div className="sliderimage">
                                <a href={"Productdetail?product=" + e._id}><img alt="product_detail" style={{ width: '198px', height: '249px' }} src={e.file1} /></a>
                              </div>
                              <div className="categoryname">
                                <a title="Sample Product" href="/#"></a>
                              </div>
                            </div>
                          </React.Fragment>
                        )
                      })
                    }
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Similarproduct;