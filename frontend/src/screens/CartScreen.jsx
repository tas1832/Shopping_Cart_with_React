import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  addToCart,
  decrementItemCart,
  removeItem,
  clearCart,
} from "../features/cartSlice";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  //   const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    // navigate("/cart");
  };
  const handleDecrementItemCart = (product) => {
    dispatch(decrementItemCart(product));
  };
  const handleRemoveItem = (product) => {
    dispatch(removeItem(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const calculateTotal = () => {
    let totalSum = 0;
    for (let i = 0; i < cart.cartItems.length; i++) {
      totalSum += cart.cartItems[i].price * cart.cartItems[i].cartItemQuantity;
    }
    return totalSum;
  };

  return (
    <div className="cart-container">
      <h2>Shppoing Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="empty-cart">
          <h4>Your cart is empty</h4>
          <div className="start-shopping">
            <Link to={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-arrow-left-circle-fill"
                viewBox="0 0 20 20"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
              </svg>
            </Link>
            <span>Start shopping</span>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems.map((item) => (
              <div key={item._id} className="cart-item-row">
                <div className="cart-item">
                  <img src={item.image} alt={item.title} />
                  <div className="cart-basic-info">
                    <h4>{item.title}</h4>

                    <button onClick={() => handleRemoveItem(item)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="item-price-info">
                  <span>${item.price}</span>
                </div>
                <div className="item-quantity-info">
                  <button onClick={() => handleDecrementItemCart(item)}>
                    -
                  </button>
                  <span>{item.cartItemQuantity} </span>
                  <button onClick={() => handleAddToCart(item)}>+</button>
                </div>
                <div className="item-total">
                  ${item.price * item.cartItemQuantity}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button
              className="btn btn-outline-secondary clear-cart"
              onClick={() => handleClearCart()}
            >
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <button className="btn btn-primary checkout">Checkout</button>
              <p>*taxes and shipping calculated at checkout</p>
              <div className="continue-shopping">
                <Link to={"/"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-arrow-left-circle-fill"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                  </svg>
                </Link>
                <span>Continue shopping</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
