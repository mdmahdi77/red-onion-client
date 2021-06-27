import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useEffect } from 'react';

const Payment = (props) => {
    const stripe = useStripe();
    const elements = useElements();

    const [paymentError, setPaymentError] = useState(null)
    const [paymentSuccess, setPaymentSuccess] = useState(null)
    useEffect(() => {
        props.markAsPaid(paymentSuccess)
    },[paymentSuccess])

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!stripe || !elements) {
 
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setPaymentError(error)
            setPaymentSuccess(null)
        } else {
            setPaymentSuccess(paymentMethod.id)
            setPaymentError(null)
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <br />
                <button className="btn btn-danger" type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
            <br />
            {
                paymentError && <p style={{color: 'red'}}>{paymentError.message}</p>
            }
            {
                paymentSuccess && <p style={{color: 'green'}}>Your payment was successfully</p>
            }
        </div>
    );
};

export default Payment;