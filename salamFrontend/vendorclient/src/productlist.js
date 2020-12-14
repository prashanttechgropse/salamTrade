import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './include/header.js';
import Productlistpage from './productlist/productlistpage.js';
import Footer from './include/footer.js';
class Productlist extends Component
          {
	        render()
	              {
		             return(
                 <div className="page" >
                     <div className="page-main" >
                           <Header/>
                           <Productlistpage/>
                      </div>
                     <Footer/>
                  </div>



			);
	}
}
export default Productlist;
