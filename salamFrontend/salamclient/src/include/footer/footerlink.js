import React from 'react';
import { Link } from 'react-router-dom';
import './footerlink.css';

const Footerlink = () => {
  return (
    <footer className="footer wow bounceInUp animated">
      <div className="footer-middle container">
        <div className="row">
          <div className="col-md-3 col-sm-4">
            <div className="footer-logo"><a href="javascript:;" title="Logo"><img src="./images/logo/logo.png" alt="logo" /></a></div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus diam arcu. </p>
            <div className="payment-accept">
              <div><img src="./images/payment-1.png" alt="payment" /> <img src="./images/payment-2.png" alt="payment" /> <img src="./images/payment-3.png" alt="payment" /> <img src="./images/payment-4.png" alt="payment" /></div>
            </div>
          </div>
          <div className="col-md-2 col-sm-4">
            <h4>About</h4>
            <ul className="links">
              <li className="first"><Link to="contact-us">Contact Us</Link></li>
              <li><Link to="about-us"> About Us</Link></li>
            </ul>
          </div>
          <div className="col-md-2 col-sm-4">
            <h4>Help</h4>
            <ul className="links">
              <li className="first"><a title="Payment" href="javascript:;">Payment</a></li>
              <li><a title="Cancellation and Return" href="javascript:;">Cancellation and Return</a></li>
              <li><a title="Shipping" href="javascript:;">Shipping</a></li>
              <li><a title="FAQ" href="javascript:;">FAQ</a></li>
            </ul>
          </div>
          <div className="col-md-2 col-sm-4">
            <h4>Policy</h4>
            <ul className="links">
              <li className="first">
                <Link to="return-policy">Return Policy</Link>
              </li>
              <li>
                <Link to="term-of-use">Terms of Use</Link>
              </li>
              <li>
                <Link to="security">Security</Link>
              </li>
              <li>
                <Link to="privacy-policy">Privacy</Link>
              </li>
              <li>
                <Link to="sitemap">Sitemap</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-4">
            <h4>Registered Office Address</h4>
            <div className="contacts-info">
              <p> 123 Main Street, Anytown,
            Saudi Arabia</p>
              <div className="phone-footer"> +1800 123 654</div>
              <div className="phone-footer"> +1800 123 687</div>
              <div className="email-footer"><a href="javascript:;">support@salamtrades.com</a> </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-xs-12 coppyright"> &copy; 2019  www.salamtrades.com All Rights Reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footerlink;