import React from 'react';
import ReactDOM from 'react-dom';
import { MDBDataTable } from 'mdbreact';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { showChatBoxAction } from '../component/chat/ChatAction';
import './userlistpage.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./datatable.css";
const URL = process.env.REACT_APP_SERVER_URL;


class Userlistpage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
    }
  }

  componentWillMount() {
    this.fetchAllUsers();
  }


  fetchAllUsers() {

    //console.log('{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{===>', this.props.userId)
    axios.post(URL + '/api/admin/userList', {
    }).then((response) => {
      // console.log('this.responsefdfddfdddddddddd',response.data);
      this.setState({
        allUsers: response.data.data,
      })

    })
  }


  render() {

    const bodyDataArr = [];

    this.state.allUsers.map((e, i) => {
      var obj = {
        "name": e._id,
        "position": e.firstName,
        "office": e.lastName,
        "age": e.email,
        "date": e.mobile,
        "message": <div className="actiontrans" onClick={() => this.props.showChatBox({ receiverId: e._id, name: e.firstName })}>
          <img style={{ width: '30px', height: '30px' }} src="/images/comment_blue.svg" alt="image" />
        </div>,
        "salary": <div className="actiontrans">
          <Link to={`/userdetail/${e._id}`}>View Detail</Link>
        </div>

      }
      bodyDataArr.push(obj);
    })

    const data = {
      columns: [
        {
          label: 'User-Id',
          field: 'name',
          sort: 'asc',
          width: 150
        },
        {
          label: 'First Name',
          field: 'position',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Last Name',
          field: 'office',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Email',
          field: 'age',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Mobile No',
          field: 'date',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Message',
          field: 'message',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Action',
          field: 'salary',
          sort: 'asc',
          width: 100
        }
      ],
      rows: bodyDataArr
    }

    return (
      <div className="my-3 my-md-5">
        <div className="container">
          <div className="page-header">
            <h4 className="page-title">User List</h4>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/Dashboard">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">User List</li>
            </ol>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <MDBDataTable
                      striped
                      bordered
                      hover
                      data={data}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    )
  }
}

function mapstateToProps(state) {
  return {
    authenticateState: state.inititateState.authenticateState,
    businesscategory: state.inititateState.businesscategory,
    businessId: state.inititateState.businessId
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    showChatBox: (data) => { dispatch(showChatBoxAction(data)) }
  })
}


export default withRouter(connect(mapstateToProps, mapDispatchToProps)(Userlistpage));

// export default Userlistpage;