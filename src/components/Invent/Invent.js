import React from 'react';
import data from '../../Data/foods.json'

const Invent = () => {
    const handleFoods = () => {
        fetch('http://localhost:8000/addFoods', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
    return (
        <div>
            <h1>This is invent section</h1>
            <button onClick={handleFoods}>click</button>
        </div>
    );
};

export default Invent;