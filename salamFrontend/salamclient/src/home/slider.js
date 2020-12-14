import React from "react";
import { getRequest } from "../Utility/helper";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./slider.css";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerList: [],
    };
  }

  componentDidMount() {
    getRequest(`admin/banner`)
      .then((res) => {
        // then print response status
        this.setState({
          bannerList: res.data,
        });
      })
      .catch((err) => {
        // then print response status
      });
  }

  renderBanner() {
    return this.state.bannerList.map((item) => {
      return (
        <div className="item">
          <img
            src={`${process.env.REACT_APP_SERVER_URL}/${item.imageName}`}
            alt="Banner1"
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="slider-fluid">
        <Carousel>{this.renderBanner()}</Carousel>
      </div>
    );
  }
}

export default Slider;
