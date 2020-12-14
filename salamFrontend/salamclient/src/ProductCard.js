import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import '../src/home/categories.css';
import ItemsCarousel from 'react-items-carousel';
import ReactItemSlider from 'react-items-slider'
import ProductCard from './ProductCard'
import range from 'lodash/range';
import $ from 'jquery'
const URL = process.env.REACT_APP_SERVER_URL;


class Slid extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      productList : [], 
      children: [],
      activeItemIndex: 0,
    }
    this.allProducts = this.allProducts.bind(this);
  }

  allProducts(){
    axios.post(URL+'/api/user/fetchProduct').then((resp)=>{
      this.setState({
        productList : resp.data.doc,
      })
    })
  }

  componentDidMount(){
    this.allProducts();
  }

  // componentWillMount(){
  //   this.setState({
  //     children: [],
  //     activeItemIndex: 0,
  //   });
 
  //   setTimeout(() => {
  //     this.setState({
  //       // children: createChildren(20),
  //     })
  //   }, 100);
  // }

  // productList = n => range(n).map(i => <div key={i} style={{ height: 200 }}>{i}</div>);
   
  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });
 
	render(){
    const {
      activeItemIndex,
      children,
    } = this.state
    var e = '';
		return(
      <div>
         <ReactItemSlider productsInView="max" arrowSize="small">
      <Link to="/home">home</Link>
      <Link to="/about">about</Link>
      <Link to="/contact">contact</Link>
      <Link to="/blog">blog</Link>
      <Link to="/shop">shop</Link>
      <Link to="/faq">faq</Link>
      <Link to="/deals">deals</Link>
    </ReactItemSlider>
 
    <ReactItemSlider productsInView={1} arrowSize="medium">
      <img alt="car" src="/img/car.jpg" />
      <img alt="monkey" src="/img/monkey.jpg" />
      <img alt="taco" src="/img/taco.jpg" />
      <img alt="pogo stick" src="/img/pogo-stick.jpg" />
    </ReactItemSlider>
 
    <ReactItemSlider productsInView={2} arrowSize="large">
      <ProductCard 
        title="car"
        price="12"
        image="/img/car.jpg"
      />
      <ProductCard 
        title="monkey"
        price="100"
        image="/img/monkey.jpg"
      />
      <ProductCard 
        title="taco"
        price="19"
        image="/img/taco.jpg"
      />
      <ProductCard 
        title="pogo stick"
        price="15"
        image="/img/pogostick.jpg"
      />
    </ReactItemSlider>
      </div>
)
	}
}

export default Slid;