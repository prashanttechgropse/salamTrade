import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import './productslider.css';

function Productslider() {

  const { productDetail, productDetailFile } = useSelector(store => ({ productDetail: store.product.productDetail, productDetailFile: store.product.productDetail['file1'] }));
  const [productDetailFile1, changeImage] = useState(productDetailFile);

  useEffect(() => {
    changeImage(productDetailFile)
  }, [productDetailFile])

  return (
    <div className="product-img-box col-lg-5 col-sm-5 col-xs-12">
      <div className="mainimage">
        <img id='imgsIs' src={productDetailFile1} alt="thumbnail" />
      </div>
      <div className="moreimage">
        {
          productDetail['file1'] !== null ?
            <a href="javascript:;" onClick={() => changeImage(productDetail['file1'])}>
              <img src={productDetail['file1']} alt="thumbnail" />
            </a>
            :
            null
        }
        {
          productDetail['file2'] !== null ?
            <a href="javascript:;" onClick={() => changeImage(productDetail['file2'])}>
              <img src={productDetail['file2']} alt="thumbnail" />
            </a>
            : null
        }
        {
          productDetail['file3'] !== null ?
            <a href="javascript:;" onClick={() => changeImage(productDetail['file3'])}>
              <img src={productDetail['file3']} alt="thumbnail" />
            </a>
            : null
        }
        {
          productDetail['file4'] !== null ?
            <a href="javascript:;" onClick={() => changeImage(productDetail['file4'])}>
              <img src={productDetail['file4']} onClick={changeImage} alt="thumbnail" /></a> :
            null
        }
      </div>
    </div >
  )
}

export default Productslider;