import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './include/header.js';
import Createbrandspage from './createbrands/createbrandspage';
import Footer from './include/footer.js';
class CreateBrand extends Component
          {
	        render()
	              {
		             return(
                 <div className="page" >
                     <div className="page-main" >
                           <Header/>
                           <Createbrandspage/>
                      </div>
                     <Footer/>
                  </div>



			);
	}
}
export default CreateBrand;
