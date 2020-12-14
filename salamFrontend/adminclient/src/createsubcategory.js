import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './include/header.js';
import Createsubcategorypage from './createsubcategory/createsubcategorypage.js';
import Footer from './include/footer.js';
class Createsubcategory extends Component
          {
	        render()
	              {
		             return(
                 <div className="page" >
                     <div className="page-main" >
                           <Header/>
                           <Createsubcategorypage/>
                      </div>
                     <Footer/>
                  </div>



			);
	}
}
export default Createsubcategory;
