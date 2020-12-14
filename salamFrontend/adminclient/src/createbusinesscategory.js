import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './include/header.js';
import Createbusinesscategorypage from './createbusinesscategory/createbusinesscategorypage';
import Footer from './include/footer.js';
class Createcategory extends Component
          {
	        render()
	              {
		             return(
                 <div className="page" >
                     <div className="page-main" >
                           <Header/>
                           <Createbusinesscategorypage/>
                      </div>
                     <Footer/>
                  </div>



			);
	}
}
export default Createcategory;
