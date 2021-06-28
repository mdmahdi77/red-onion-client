import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Preloader from '../Preloader/Preloader'
import './FoodDetails.css'

const FoodDetails = (props) => {
    console.log(props)
    const { foodId } = useParams();
    const [currentFood, setCurrentFood] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [selectBigImg, setSelectBigImg] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false)
    const [preloaderVisibility, setPreloaderVisibility] = useState("block")

    useEffect(() => {
        fetch(`http://localhost:8000/foods`)
            .then(res => res.json())
            .then(data => {
                setCurrentFood(data);
                setPreloaderVisibility("none")
            })
            .catch(err => console.log(err))
    }, [])

    const foodData = currentFood.find(food => food._id == foodId)

    const finalCartHandler = (foodData) => {
        foodData.quantity = quantity
        props.cartHandler(foodData)
        setIsSuccess(true)
    }

    if(isSuccess){
        setTimeout(() => setIsSuccess(false), 1500)
    }
    console.log(isSuccess)

    return (
        <div className="foodDetails my-5 pt-5 container">
            <Preloader visibility={preloaderVisibility} />
            <div className="row">
                <div className="col-md-6">
                    <h1>{foodData?.name}</h1>
                    <p className="my-5">{foodData?.fullDescription}</p>
                    <div className="d-flex my-4">
                        <p className="price">{foodData?.price.toFixed(2)}</p>
                        <div className="cart-controller ml-3 btn">
                            <button className="btn" onClick={() => setQuantity(quantity <= 1 ? 1 : quantity - 1)}>-</button>
                            {quantity}
                            <button className="btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                    </div>
                    <div className="action d-flex align-items-center">
                        <button className="btn btn-danger btn-rounded mb-2" onClick={() => finalCartHandler(foodData)}><FontAwesomeIcon icon={faCartArrowDown} /> / Add</button>
                        {
                            isSuccess && <p className="text-success ml-3 success-mgs"><FontAwesomeIcon icon={faCheckCircle} />  Item added to Cart</p>
                        }
                    </div>
                    {/* <div className="more-images">
                        {
                            foodData?.images.map((img, index) => <img src={img} alt="" className="" />)
                        }
                    </div> */}
                </div>
                <div className="col-md-6">
                    <img src={foodData?.images[0]} alt="" className="img-fluid" />
                </div>
            </div>
        </div>
    );
};

export default FoodDetails;