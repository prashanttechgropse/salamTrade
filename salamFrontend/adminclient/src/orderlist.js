import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './include/header.js';
import Orderlistpage from './orderlist/orderlistpage.js';
import Footer from './include/footer.js';
class Orderlist extends Component
          {
	        render()
	              {
		             return(
                 <div className="page" >
                     <div className="page-main" >
                           <Header/>
                           <Orderlistpage/>
                      </div>
                     <Footer/>
                  </div>



			);
	}
}
export default Orderlist;
