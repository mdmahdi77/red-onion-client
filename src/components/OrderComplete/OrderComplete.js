import React from 'react';
import map from '../../images/ordercomplete.png'
import rider from '../../images/Image/rider.png'
import RiderHalmet from '../../images/Image/helmet.png'
import { useState } from 'react';
import { useEffect } from 'react';

const OrderComplete = (props) => {
    const [orderId, setOrderId] = useState()
    useEffect(() => {
        setOrderId(props.OrderId)
        window.scrollTo(0, 0)
    },[props])
    return (
        <div className="container pt-5 my-5">
            <div className="row">
                <div className="col-md-8">
                    <img src={map} alt="" className="img-fluid" />
                </div>
                <div className="col-md-4 pl-md-5">
                    <div className="bg-light p-3 rounded">
                        <img src={rider} className="w-25 ml-5" alt="" />
                        <div className="bg-white rounded p-3 my-3">
                            <div>
                                {
                                    orderId ?
                                    <div>
                                        <h6>Order Id:</h6>
                                        <p>{props.orderId}</p>
                                    </div>
                                    :
                                    <h6>Fetching Order Id.....</h6>
                                }
                            </div>
                            <div>
                                {
                                    props.deliveryDetails ?
                                    <p>{props.deliveryDetails.flat}, {props.deliveryDetails.road}</p> 
                                   : <p>Loading data ...</p>
                                }
                            </div>
                            <div>
                            <h5>Shop Address</h5>
                                <p>Star Kabab and Restaura</p>
                            </div>
                        </div>
                        <h1>09:00</h1>
                        <p>Estimated Delivery</p>

                        <div className="bg-white rounded p-3 d-flex">
                            <img className="w-25 mr-2" src={RiderHalmet} alt=""/>
                            <div>
                                <h6>Mehedi</h6>
                                <p>Your Rider</p>
                            </div>
                        </div>

                        <button className="btn btn-block my-3 btn-danger">Contact</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderComplete;