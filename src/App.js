import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {

  const cartBox = useRef(null);

  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [CartItemsVisible, setCartItemsVisible] = useState('none');

  useEffect(() => {

    const dataUrl = axios({
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'get'
    });

    dataUrl.then(res => {
      setData(res.data);
    });

  }, []);

  const clickCartButton = (productId, productTitle, productBody) => {

    setCartItems([
      ...cartItems,
      {
        id: productId,
        title: productTitle,
        url: productBody
      }
    ]);

  }

  const showCartItems = (e) => {
    setCartItemsVisible('block');
  }

  const hideCartItems = (e) => {

    if (!cartBox.current.contains(e.target)) {
      setCartItemsVisible('none');
    }

  }

  return (
    <div className="app" onClick={ hideCartItems }>

      <div className="cartIcon" onClick={ showCartItems } ref={ cartBox }>
        Cart
        {
          cartItems.length > 0 ?
          <div className="badge">{ cartItems.length }</div>
          :
          <div className="badge">0</div>
        }

        {
          cartItems.length > 0 ?
            <div className="cartItems" style={{ display: CartItemsVisible }}>
              {
                cartItems.map(cartItem => (
                  <div className="cartItemTitle">{ cartItem.title }</div>
                ))
              }
              <button className="checkoutButton">Check Out</button>
            </div>
            :
            <div className="cartItems" style={{ display: CartItemsVisible }}>
              <div className="cartError">× No Items!</div>
            </div>
        }
      </div>

      <div className="products">
        {
          data.map(product => (
            <div className="productBlock">
              <div className="productPlaceholder"></div>
              <p className="productTitle">{ product.title }</p>
              <button className="cartButton" onClick={ () => clickCartButton(product.id, product.title, product.body) }>Add to Cart</button>
            </div>
          ))
        }
      </div>

    </div>
  );
}

export default App;
