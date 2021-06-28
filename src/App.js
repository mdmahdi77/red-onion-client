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
import { AuthProvider, PrivateRoute } from "./components/Login/Auth";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import OrderComplete from "./components/OrderComplete/OrderComplete";

function App() {
  const [cart, setCart] = useState([])
  const [orderId, setOrderId] = useState(null)
  const [userEmail, setUserEmail] = useState(null)

  const [deliveryDetails, setDeliveryDetails] = useState({
    toDoor: null, road: null, flat: null, businessName: null, address: null
  })

  const deliveryDetailsHandler = (data) => {
    setDeliveryDetails(data)
  }

  const getUserEmail = (email) => {
    setUserEmail(email)
  }

  const clearCart = () => {
    const orderItems = cart.map(cartItem => {
      return { FoodName: cartItem.name, foodType: cartItem.type, foodId: cartItem._id, quantity: cartItem.quantity }
    })

    const orderDetailsData = { orderItems, deliveryDetails, userEmail }
    fetch('http://localhost:8000/submitOrders', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(orderDetailsData)
    })
      .then(res => res.json())
      .then(data => setOrderId(data))
    console.log(orderId)
    setCart([])
  }


  const cartHandler = (data) => {
    const alreadyAdded = cart.find(crt => crt.id === data.id)
    const newCart = [...cart, data]
    setCart(newCart)
    if (alreadyAdded) {
      const reamingCart = cart.filter(crt => crt.id != data)
      setCart(reamingCart)
    } else {
      const newCart = [...cart, data]
      setCart(newCart)
    }
  }

  const checkOutItemHandler = (productId, productQuantity) => {
    const newCart = cart.map(item => {
      if (item.id == productId) {
        item.quantity = productQuantity;
      }
      return item;
    })

    const filteredCart = newCart.filter(item => item.quantity > 0)
    setCart(filteredCart)
  }

  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/home">
            <Home cart={cart} />
          </Route>
          <PrivateRoute path="/cart">
            <Navbar cart={cart} />
            <Cart cart={cart} checkOutHandler={checkOutItemHandler} deliveryDetails={deliveryDetails} deliveryDetailsHandler={deliveryDetailsHandler} clearCart={clearCart} getUserEmail={getUserEmail} />
          </PrivateRoute>
          <Route path="/foodDetails/:foodId">
            <Navbar cart={cart} />
            <FoodDetails cart={cart} cartHandler={cartHandler} />
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/orderComplete">
            <Navbar cart={cart} />
            <OrderComplete deliveryDetails={deliveryDetails} orderId={orderId} />
          </Route>
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
