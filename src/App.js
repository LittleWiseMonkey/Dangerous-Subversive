import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { commerce } from './lib/commerce';
import { Products, NavBar, Cart, Checkout } from './components';
// import { Checkout } from '@chec/commerce.js/features/checkout';

const App = () => {

//    USESTATES   /////
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');



  //    Fetch Products list from Commerce.js
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  }

  //    Fetch Cart Item list from Commerce.js
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  //    Add Items to Cart
  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);

    setCart(cart);
  }

  //    Update Cart Items
  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  }

  //    Remove Cart Items
  const handleRemoveCartItem = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  }

  //    Handle Empty Cart Button on CheckOut Page
  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  }

  //    Refresh Cart to Empty
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  }

  //    Capture Stripe Checkout
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    }
    catch (error) {
      setErrorMessage(error.data.error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);


  return (
    <Router>
      <div>
        <NavBar totalItems={cart.total_items} />

        <Switch>
          {/***   DISPLAY PAGE    *****/}
          <Route exact path='/'>
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          {/***   SHOPPING CART   *****/}
          <Route exact path='/cart'>
            <Cart
                cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveCartItem={handleRemoveCartItem}
                handleEmptyCart={handleEmptyCart}
            />
          </Route>
          {/***   CHECKOUT    *****/}
          <Route exact path='/checkout'>
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          </Route>

        </Switch>

      </div>
    </Router>
  )
}

export default App;