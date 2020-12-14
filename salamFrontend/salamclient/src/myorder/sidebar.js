import React from 'react';
import './sidebar.css';
import axios from 'axios';
import swal from 'sweetalert';
import { withRouter, Link } from 'react-router-dom'
const URL = process.env.REACT_APP_SERVER_URL;

class Sidebar extends React.Component {

  logout(event) {
    event.preventDefault();
    axios.get(URL + '/api/user/Logout').then((response) => {
      localStorage.clear();
      if (response.data.status) {
        swal("Successful",
          `${response.data.message}`,
        ).then((d) => {
          window.location = "/";
        })
      }
    });
  }

  render() {
    return (
      <aside className="col-right sidebar col-sm-3 wow bounceInUp animated">
        <div className="block block-account">
          <div className="block-title">My Account</div>
          <div className="block-content">
            <ul>
              <li><a href='javascript:;' onClick={() => this.props.history.push("Myprofile")}>My Profile </a></li>
              <li className="current"><a href="javascript:;">My Order</a></li>
              <li><a href="javascript:;" onClick={() => this.props.history.push("mywallet")}>My Wallet</a></li>
              <li><a href='javascript:;' onClick={() => this.props.history.push("Mywishlist")}>My Wishlist</a></li>
              {/* <li><a href="javascript:;">Setting</a></li> */}
              {/*<li><a href="javascript:;">Sell With Us</a></li>*/}
              {/* <li><a href="javascript:;">About Us</a></li> */}
              <li><Link to="term-of-use">Help & Support</Link></li>
              <li><Link to="privacy-policy">Privacy Policy</Link></li>
              <li><Link to="term-of-use">Term & Condition</Link></li>
              <li><a href="javascript:;" onClick={this.logout.bind(this)}>Log Out</a></li>
            </ul>
          </div>
        </div>
      </aside>
    )
  }
}

export default withRouter(Sidebar);