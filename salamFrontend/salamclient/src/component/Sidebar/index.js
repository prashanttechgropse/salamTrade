import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import $ from 'jquery';
import { withRouter, Link } from 'react-router-dom';
import Chat from '../chat/Chat'
import './sidebar.css';
const URL = process.env.REACT_APP_SERVER_URL;

const Sidebar = (props) => {
  const [isChatBoxVisible, setChatBoxVisiblity] = useState(false);

  const showChatBox = (event) => {
    event.stopPropagation();
    const chatModalEl = $('.modal-dialog')[0];
    const hoveredEl = event.target;
    if (!$.contains(chatModalEl, hoveredEl) || $(event.target).hasClass('close')) {
      setChatBoxVisiblity(isChatBoxVisible ? false : true);
    }
  }

  const logout = (event) => {
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
  return (
    <>
      <Chat isChatBoxVisible={isChatBoxVisible} showChatBox={showChatBox} />
      <aside className="col-right sidebar col-sm-3 wow bounceInUp animated">
        <div className="block block-account">
          <div className="block-title">My Account</div>
          <div className="block-content">
            <ul>
              <li className={props.pageSelected === 'myprofile' ? 'current' : ''} >
                <Link to="myprofile">My Profile </Link>
              </li>
              <li className={props.pageSelected === 'myorder' ? 'current' : ''} >
                <Link to="myOrders">My Order</Link>
              </li>
              <li className={props.pageSelected === 'mywallet' ? 'current' : ''}>
                <Link to="mywallet">My Wallet</Link>
              </li>
              <li className={props.pageSelected === 'mywishlist' ? 'current' : ''}>
                <Link to="Mywishlist">My Wishlist</Link>
              </li>
              <li><a onClick={showChatBox}>Help & Support</a></li>
              <li><Link to="privacy-policy">Privacy Policy</Link></li>
              <li><Link to="term-of-use">Term & Condition</Link></li>
              <li><a href="javascript:;" onClick={logout}>Log Out</a></li>
            </ul>
          </div>
        </div>

      </aside>
    </>
  )
}

export default withRouter(Sidebar);