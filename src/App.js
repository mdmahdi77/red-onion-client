import React from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Cart from "./components/Cart/Cart";
import FoodDetails from "./components/Food/FoodDetails";
import Foods from "./components/Food/Foods";
import Home from './components/Home/Home'
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [cart, setCart] = useState([])

  const cartHandler = (data) => {
    const alreadyAdded = cart.find(crt => crt.id === data.id)
    const newCart = [...cart, data]
    setCart(newCart)
    if(alreadyAdded){
      const reamingCart = cart.filter(crt => crt.id != data)
      setCart(reamingCart)
    }else{
      const newCart = [...cart, data]
      setCart(newCart)
    }
  }

  const checkOutHandler = (productId, productQuantity) => {
    const newCart = cart.find(item => {
      if(item.id == productId){
        item.quantity = productQuantity
      }
      return item
    })

    // const filteredCart = newCart.filter(item => item.quantity > 0)
    // setCart(filteredCart)
  }

  return (
    <Router>
        <Switch>
          <Route path="/home">
            <Home cart={cart} />
          </Route>
          <Route path="/cart">
            <Navbar />
            <Cart cart={cart} checkOutHandler={checkOutHandler} />
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/foodDetails/:foodId">
              <Navbar />
              <FoodDetails cart={cart} cartHandler={cartHandler} />
          </Route>
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
