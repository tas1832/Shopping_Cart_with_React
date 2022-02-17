import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQty: localStorage.getItem("cartTotalQty")
    ? localStorage.getItem("cartTotalQty")
    : 0,
  cartTotalPrice: localStorage.getItem("cartTotalPrice")
    ? localStorage.getItem("cartTotalPrice")
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      //   first  check if the item already exists in the cart
      const productIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (productIndex === -1) {
        state.cartItems.push({ ...action.payload, cartItemQuantity: 1 });
        toast.success(`${action.payload.title} added to cart`, {
          position: "bottom-left",
        });
      } else {
        state.cartItems[productIndex].cartItemQuantity += 1;
        toast.info("Quantity increased", { position: "bottom-left" });
      }

      state.cartTotalQty++;
      state.cartTotalPrice += action.payload.price;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("cartTotalQty", state.cartTotalQty);
      localStorage.setItem("cartTotalPrice", state.cartTotalPrice);
    },
    decrementItemCart(state, action) {
      //   first  check if the item already exists in the cart
      const product = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (product.cartItemQuantity > 1) {
        product.cartItemQuantity--;
      } else {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== product._id
        );
      }
      toast.info("Quantity decreased", { position: "bottom-left" });
      state.cartTotalQty--;
      state.cartTotalPrice -= action.payload.price;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("cartTotalQty", state.cartTotalQty);
      localStorage.setItem("cartTotalPrice", state.cartTotalPrice);
    },
    removeItem(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      toast.info("Item removed", { position: "bottom-left" });
      state.cartTotalQty -= action.payload.cartItemQuantity;
      state.cartTotalPrice -= action.payload.price;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("cartTotalQty", state.cartTotalQty);
      localStorage.setItem("cartTotalPrice", state.cartTotalPrice);
    },
    clearCart(state, action) {
      state.cartItems = [];
      state.cartTotalQty = 0;
      state.cartTotalPrice = 0;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("cartTotalQty", state.cartTotalQty);
      localStorage.setItem("cartTotalPrice", state.cartTotalPrice);
    },
  },
});

export const { addToCart, decrementItemCart, removeItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
