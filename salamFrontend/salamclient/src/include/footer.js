import React from 'react';
import Brand from './footer/brand.js';
import Newsletter from './footer/newsletter.js';
import Footerlink from './footer/footerlink.js';
import Loginsignup from './footer/loginsignup.js';
import './footer.css';
class Footer extends React.Component{
	render()
	{
		return(
      <div>
      <Brand/>
      <Newsletter/>
      <Loginsignup/>
      <Footerlink/>
      </div>
			)

	}
}

export default Footer;