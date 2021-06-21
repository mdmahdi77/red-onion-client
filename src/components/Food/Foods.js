import React, { useEffect, useState } from 'react';
import FoodItem from './FoodItem';
import './Food.css'

const Foods = () => {
    const [foods, setFoods] = useState([]);
    const [selectedFoodType, setSelectedFoodType] = useState("Breakfast");


    useEffect(() => {
        fetch('http://localhost:8000/foods')
            .then(res => res.json())
            .then(data => {
                setFoods(data);
            })
            .catch(err => console.log(err))
    }, [foods.length])

    const selectedFoods = foods.filter(food => food.type == selectedFoodType)
    console.log(selectedFoods)

    return (
        <div className="food-area my-5">
            <div className="container">
                <nav>
                    <ul className="nav justify-content-center">
                        <li onClick={() => setSelectedFoodType("Breakfast")} className="nav-item">
                            <span to="breakfast" className={selectedFoodType === "Breakfast" ? "active nav-link" : "nav-link"}>Breakfast</span>
                        </li>
                        <li onClick={() => setSelectedFoodType("Lunch")} className="nav-item">
                            <span to="breakfast" className={selectedFoodType === "Lunch" ? "active nav-link" : "nav-link"}>Lunch</span>
                        </li>
                        <li onClick={() => setSelectedFoodType("Dinner")} className="nav-item">
                            <span to="breakfast" className={selectedFoodType === "Dinner" ? "active nav-link" : "nav-link"}>Dinner</span>
                        </li>
                    </ul>
                </nav>

                <div className="row my-5">
                    {
                        selectedFoods.map(food => <FoodItem key={food._id} food={food} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Foods;