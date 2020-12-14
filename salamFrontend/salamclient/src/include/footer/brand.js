import React, { useState, useEffect } from "react";
import axios from "axios";
import "./brand.css";
const URL = process.env.REACT_APP_SERVER_URL;

const Brand = () => {
  const [brandList, setBrandList] = useState([]);

  useEffect(() => {
    axios.get(URL + "/api/user/brands").then((response) => {
      setBrandList(response.data.doc);
    });
  }, []);

  const renderBrands = () => {
    let listofbrands = [];
    brandList.map((item, index) => {
      if (item.file !== null)
        listofbrands.push(
          <div
            key={`brands-${index}`}
            className="item"
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            <a href="#x">
              <img
                style={{ width: "100px", height: "100px" }}
                src={item.file}
                alt="brand_photo"
              />
            </a>
          </div>
        );
    });
    return listofbrands;
  };
  return (
    <div className="brand-logo ">
      <div className="container">
        <div className="slider-items-products">
          <div
            id="brand-logo-slider"
            className="product-flexslider hidden-buttons"
          >
            <div
              className="brand-item"
              style={{
                opacity: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "space-between",
              }}
            >
              {renderBrands()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;
