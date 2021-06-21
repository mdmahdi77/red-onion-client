import React from 'react';
import Navbar from '../Navbar/Navbar';
import Foods from '../Food/Foods'

const Home = (props) => {
    return (
        <div>
            <Navbar  cart={props.cart}></Navbar>
            <Foods></Foods>
        </div>
    );
};

export default Home;