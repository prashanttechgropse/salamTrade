import React from 'react';
import ReactDOM from 'react-dom';
import './orderlistpage.css';
class Orderlistpage extends React.Component{
	render()
	{
		return(
        <div className="my-3 my-md-5">
          <div className="container">
            <div className="page-header">
              <h4 className="page-title">Order List</h4>
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Order List</li>
              </ol>
            </div>
            <div className="row">
              <div className="col-md-12 col-lg-12">
              <div className="card">
                <div className="card-body">
                                  <div className="table-responsive">
                  <table id="example" className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th className="wd-15p">Order Id</th>
                        <th className="wd-15p">User Name</th>
                        <th className="wd-20p">Date/Time</th>
                        <th className="wd-20p">Price</th>
                        <th className="wd-15p">Deliver Address</th>
                        <th className="wd-25p">Payment Status</th>
                        <th className="wd-25p">Order Status</th>
                        <th className="wd-25p">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>#O1001</td>
                        <td>Jamil Khan</td>
                        <td>20-07-2019/02:30 PM</td>
                        <td>$200</td>
                        <td>MBV 1014 Dubai</td>
                        <td>Online Payment</td>
                        <td>Pending</td>
                        <td>
                          <div className="actiontrans">
                            <a href="/orderdetail">View Detail</a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>#O1002</td>
                        <td>Jamil Khan</td>
                        <td>20-07-2019/02:30 PM</td>
                        <td>$200</td>
                        <td>MBV 1014 Dubai</td>
                        <td>Online Payment</td>
                        <td>Complete</td>
                        <td>
                          <div className="actiontrans">
                            <a href="/orderdetail">View Detail</a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>#O1003</td>
                        <td>Jamil Khan</td>
                        <td>20-07-2019/02:30 PM</td>
                        <td>$200</td>
                        <td>MBV 1014 Dubai</td>
                        <td>Online Payment</td>
                        <td>Pending</td>
                        <td>
                          <div className="actiontrans">
                            <a href="/orderdetail">View Detail</a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>#O1004</td>
                        <td>Jamil Khan</td>
                        <td>20-07-2019/02:30 PM</td>
                        <td>$200</td>
                        <td>MBV 1014 Dubai</td>
                        <td>Online Payment</td>
                        <td>Pending</td>
                        <td>
                          <div className="actiontrans">
                            <a href="/orderdetail">View Detail</a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>#O1005</td>
                        <td>Jamil Khan</td>
                        <td>20-07-2019/02:30 PM</td>
                        <td>$200</td>
                        <td>MBV 1014 Dubai</td>
                        <td>Online Payment</td>
                        <td>Complete</td>
                        <td>
                          <div className="actiontrans">
                            <a href="/orderdetail">View Detail</a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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

export default Orderlistpage;