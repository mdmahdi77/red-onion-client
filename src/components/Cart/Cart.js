import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from '../Payment/Payment';
import { useState } from 'react';
import { useAuth } from '../Login/Auth';
import {Link} from 'react-router-dom';

const Cart = (props) => {
    console.log(props)

    const auth = useAuth()

    const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
    const [paid, setPaid] = useState(null)
    const markAsPaid = paymentInfo => {
        setPaid(paymentInfo)
    }
    console.log(paid)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        props.deliveryDetailsHandler(data)
        props.getUserEmail(auth.user.email)
    };

    useEffect(() =>{
        window.scrollTo(0, 0)
    }, []);

    const { toDoor, road, flat, businessName, address } = props.deliveryDetails

    const subTotal = props.cart.reduce((total, foods) => {
        return total + (foods.price * foods.quantity)
    }, 0)
    const totalQuantity = props.cart.reduce((total, foods) => {
        return total + foods.quantity
    }, 0)
    const tax = (subTotal / 100) * 5
    const deliveryFee = totalQuantity && 2
    const grandTotal = subTotal + tax + deliveryFee
    return (
        <div className="shipment container pt-5 my-5">
            <div className="row">
                <div style={{ display: (toDoor && road && flat && businessName && address) ? "none" : "block" }} className="col-md-5">
                    <h4>Edit Delivery Details</h4>
                    <hr />
                    <br />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input className="form-control" name="toDoor" defaultValue={toDoor} {...register("toDoor", { required: true })} placeholder="Delivery To Door" />
                            {errors.toDoor && <span className="error">This field is required</span>}
                        </div>
                        <br />
                        <div className="form-group">
                            <input className="form-control" name="road" defaultValue={road} {...register("road", { required: true })} placeholder="Road No." />
                            {errors.road && <span className="error">This field is required</span>}
                        </div>
                        <br />
                        <div className="form-group">
                            <input className="form-control" name="flat" defaultValue={flat} {...register("flat", { required: true })} placeholder="Flat, Suit or Floor" />
                            {errors.flat && <span className="error">This field is required</span>}
                        </div>
                        <br />
                        <div className="form-group">
                            <input className="form-control" name="businessName" defaultValue={businessName} {...register("businessName", { required: true })} placeholder="Business Name" />
                            {errors.businessName && <span className="error">This field is required</span>}
                        </div>
                        <br />
                        <div className="form-group">
                            <textarea className="form-control" name="address" defaultValue={address} {...register("address", { required: true })} placeholder="Address" cols="30" row="3"></textarea>
                            {errors.exampleRequired && <span className="error">This field is required</span>}
                        </div>
                        <br />
                        <div className="form-group">
                            <button className="btn btn-danger btn-block" type="submit">Save & Continue</button>
                        </div>
                    </form>
                </div>
                <div style={{ display: (toDoor && road && flat && businessName && address) ? "block" : "none" }} className="col-md-5">
                    <Elements stripe={stripePromise}>
                        <Payment markAsPaid={markAsPaid} />
                    </Elements>
                </div>
                <div className="col-md-5 offset-md-2">
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
                                    <button onClick={() => props.checkOutHandler(item.id, (item.quantity + 1))} className="btn font-weight-bolder">+</button>
                                    <button className="btn bg-white rounded">{item.quantity}</button>
                                    {
                                        item.quantity > 0 ? <button onClick={() => props.checkOutHandler(item.id, (item.quantity - 1))} className="btn font-weight-bolder">-</button>
                                            :
                                            <button disabled className="btn font-weight-bolder">-</button>
                                    }
                                </div>
                            </div>
                        )
                    }

                    <div className="cart-calculation">
                        <p className="d-flex justify-content-between"><span>Sub Total . {totalQuantity} Item</span><span>${subTotal.toFixed(2)}</span></p>
                        <p className="d-flex justify-content-between"><span>Tax</span><span>${tax.toFixed(2)}</span></p>
                        <p className="d-flex justify-content-between"><span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span></p>
                        <hr />
                        <p className="d-flex justify-content-between"><span>Total</span><span>${grandTotal.toFixed(2)}</span></p>
                        {
                            totalQuantity ? 
                            paid ?
                            <Link to="/orderComplete">
                                <button className="btn btn-block btn-danger" onClick={ () => props.clearCart()}>Check out your food</button>
                            </Link>
                            :
                                <button disabled className="btn btn-block btn-secondary">Check Out Your Food</button>
                            :
                            <button disabled className="btn btn-block btn-secondary">Nothing to checkout</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;