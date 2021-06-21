import React from 'react';

const Cart = (props) => {
    console.log(props)
    return (
        <div className="shipment container pt-5 my-5">
            <div className="row offset-md-1">
                <div className="col-md-5"></div>
                <div className="col-md-5">
                    {
                        props.cart.map(item =>
                            <div className="single-checkout-item mb-3 bg-light rounded d-flex align-items-center justify-content-between p-3">
                                <img src={item.images[0]} width="100px" alt="" />
                                <div>
                                    <h6>{item.name}</h6>
                                    <h4 className="text-danger">{item.price.toFixed(2)}</h4>
                                    <p>Delivery fee</p>
                                </div>
                                <div className="checkout-item-button ml-3 btn">
                                    <button onClick={() => props.checkOutHandler(item.id, (item.quantity + 1)) } className="btn font-weight-bolder">+</button>
                                    <button className="btn bg-white rounded">{item.quantity}</button>
                                    {
                                        item.quantity > 0 ? <button onClick={() => props.checkOutHandler(item.id, (item.quantity - 1)) } className="btn font-weight-bolder">-</button>
                                        :
                                        <button disabled className="btn font-weight-bolder">-</button>
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Cart;