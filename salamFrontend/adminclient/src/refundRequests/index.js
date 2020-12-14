import React from 'react';
import { MDBDataTable } from 'mdbreact';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./datatable.css";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
const URL = process.env.REACT_APP_SERVER_URL;


class RefundRequestPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            myOrders: [],
            rowdata: [],
            body: [],
        }
    }

    componentWillMount() {
        this.fetchMyOrder();
    }


    fetchMyOrder() {

        axios.get(URL + '/api/admin/getAllAdminReturnRequest')
            .then((response) => {
                console.log('this.responsefdfddfdddddddddd', response.data.order);
                this.setState({
                    myOrders: response.data.order,
                })
            })
    }

    initiateRefundProcess = (item) => {
        swal({
            title: "Are you sure?",
            text: `Are you sure that you want to refund amount $${item.orderItems.totalOrderItemAmount} ?`,
            icon: "warning",
            dangerMode: true,
          })
            .then(willStart => {
                if (willStart) {
                    const data = {
                        "orderId":  item._id,
                        "subOrderId" : item.orderItems._id
                    }
                    return axios.post(`${URL}/api/admin/initiate-refund-process`,data );
                }
            })
            .then(json => {
                console.log(json);
                this.fetchMyOrder()
            })
            .catch(err => {
                swal("Oops!", "Seems like we couldn't fetch the info", "error");
            });
    }

    render() {
        const bodyDataArr = [];

        this.state.myOrders.map((e, i) => {
            var obj = {
                "orderId": e._id,
                "customerFullName": e.customerId[0] !== null ? `${e.customerId[0].firstName} ${e.customerId[0].lastName}` : '',
                "orderCost": '$' + e.orderItems.totalOrderItemAmount,
                "requestDate": e.orderItems.refundRequest.refundRequestDate,
                // "requestComment": e.orderItems.requestComment,
                "reason": e.orderItems.refundRequest.requestComment,
                "startRefund": <a href='#' onClick={() => this.initiateRefundProcess(e)}><i class="fa fa-money" aria-hidden="true"></i></a>
            }
            bodyDataArr.push(obj);
        })

        const data = {
            columns: [
                {
                    label: 'Order-Id',
                    field: 'orderId',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Customer Name',
                    field: 'customerFull',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'Price',
                    field: 'orderCost',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Request Date',
                    field: 'requestDate',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Reason',
                    field: 'reason' ,
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Initiate Refund',
                    field: 'startRefund',
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
                        <h4 className="page-title">Refund List</h4>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/Dashboard">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Refund List</li>
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

export default withRouter(connect(mapstateToProps)(RefundRequestPage));