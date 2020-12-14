import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import axios from "axios";
import swal from "sweetalert";
import Chat from "../component/chat/Chat";
import "./header.css";
const URL = process.env.REACT_APP_SERVER_URL;

function Header(props) {
  const dispatch = useDispatch();
  const [state, setStatus] = useState([]);
  const [adminStatus, setAdminStatus] = useState("Verify");
  const [isChatBoxVisible, setChatBoxVisiblity] = useState(false);
  const [isDropdownMenuVisible, toggleDropdownMenu] = useState(false);
  const { authenticateState, userId, name, type, image } = useSelector(
    (state) => state.inititateState
  );

  const showChatBox = (event) => {
    event.stopPropagation();
    const chatModalEl = $(".modal-dialog")[0];
    const hoveredEl = event.target;
    if (
      !$.contains(chatModalEl, hoveredEl) ||
      $(event.target).hasClass("minimise")
    ) {
      setChatBoxVisiblity(isChatBoxVisible ? false : true);
    }
  };

  const logout = (event) => {
    event.preventDefault();
    axios.get(URL + "/api/vendor/logOut").then((response) => {
      localStorage.clear();
      if (response.data.status) {
        swal("Successful", `${response.data.message}`).then((d) => {
          if (d) return props.history.replace("/");
        });
      }
    });
  };

  const handleClick = () => {
    let obj = {};
    obj.userId = userId;
    obj.adminStatus = adminStatus;
    axios.post(URL + "/api/vendor/userStatus", obj).then((response) => {
      console.log("response", response);
      if (response.data.status == "Verify") {
        props.history.push("/Addnewproduct");
      } else {
        alert(response.data.message);
        // window.location = '/Dashboard'
      }
    });
  };

  return (
    <div className="header-salam">
      <Chat isChatBoxVisible={isChatBoxVisible} showChatBox={showChatBox} />
      <div className="header py-1">
        <div className="container">
          <div className="d-flex">
            <a className="header-brand" href="#">
              <img
                src="./images/logo/logo.png"
                className="header-brand-img"
                alt="FundMaster logo"
              />
            </a>
            <div className="d-flex order-lg-2 ml-auto">
              <div className="Header-Comment" onClick={showChatBox}>
                <span className="Header-Comment--Icon">
                  <img src="/images/comment.svg" alt="image" />
                </span>
              </div>
              <div
                className="dropdown mt-1"
                onClick={() =>
                  toggleDropdownMenu(
                    (isDropdownMenuVisible) => !isDropdownMenuVisible
                  )
                }
              >
                <a
                  href="#"
                  className="nav-link pr-0 leading-none"
                  data-toggle="dropdown"
                >
                  <span className="userimage">
                    {" "}
                    <img
                      src={image === null ? "images/defaultImg.png" : image}
                    />{" "}
                  </span>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right dropdown-menu-arrow"
                  style={{
                    display: isDropdownMenuVisible ? "block" : "none",
                    margin: "0px -200px",
                  }}
                >
                  <div className="text-center">
                    <a
                      href="#"
                      className="dropdown-item text-center font-weight-sembold user"
                    >
                      {name}
                    </a>
                    <span className="text-center user-semi-title text-dark">
                      {type}
                    </span>
                    <div className="dropdown-divider"></div>
                  </div>
                  <Link className="dropdown-item" to="/dashboard">
                    <i className="dropdown-icon mdi mdi-home"></i> Dashboard
                  </Link>
                  <Link className="dropdown-item" to="/profile">
                    <i className="dropdown-icon mdi mdi-account-outline"></i>{" "}
                    Profile
                  </Link>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#" onClick={logout}>
                    <i className="dropdown-icon mdi  mdi-logout-variant"></i>{" "}
                    Sign out
                  </a>
                </div>
              </div>
            </div>
            <a
              href="#"
              className="header-toggler d-lg-none ml-3 ml-lg-0"
              data-toggle="collapse"
              data-target="#headerMenuCollapse"
            >
              <span className="header-toggler-icon"></span>
            </a>
          </div>
        </div>
      </div>
      <div className="admin-navbar">
        <div className="container">
          <ul className="nav">
            <li className="nav-item with-sub">
              <a className="nav-link active" href="/dashboard">
                <span> Dashboard</span>
              </a>
            </li>
            <li className="nav-item with-sub">
              <a className="nav-link" href="#">
                <span> Order Management</span>
              </a>
              <div className="sub-item">
                <ul>
                  <li>
                    <Link to="/Orderlist">Order List </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item with-sub">
              <a className="nav-link" href="#">
                <span> Product Management</span>
              </a>
              <div className="sub-item">
                <ul>
                  <li>
                    <Link to="/Productlist">Product List</Link>
                  </li>
                  <li>
                    <a onClick={handleClick}> Add New Product </a>
                  </li>
                  {/* {
											this.state.status === "Verify" ?
											<a onClick = {this.handleClick.bind(this)} href="/Addnewproduct">Add New Product</a> 
											: 
											<a onClick = {this.handleClick.bind(this)} href="#">Add New Product</a>
										} */}
                  {/* <a onClick = {this.handleClick.bind(this)} href="/Addnewproduct">Add New Product</a>  */}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Header);
