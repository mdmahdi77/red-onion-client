import React from 'react';
import { Link } from 'react-router-dom';

const FoodItem = (props) => {
    const { _id, name, images, price } = props.food
    return (
        <div className="col-md-4 text-center">
            <Link to={`/foodDetails/${_id}`}>
                <div className="card border-none">
                    <img src={images[0]} className="card-img-top" alt="" />
                    <div className="card-body">
                        <h5>{name}</h5>
                        <p>Price: ${price.toFixed(2)}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default FoodItem;