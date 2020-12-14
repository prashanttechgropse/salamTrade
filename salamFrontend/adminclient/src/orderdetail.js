import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './include/header.js';
import Orderdetailpage from './orderdetail/orderdetailpage.js';
import Footer from './include/footer.js';
class Orderdetail extends Component
          {
	        render()
	              {
		             return(
                 <div className="page" >
                     <div className="page-main" >
                           <Header/>
                           <Orderdetailpage/>
                      </div>
                     <Footer/>
                  </div>



			);
	}
}
export default Orderdetail;
