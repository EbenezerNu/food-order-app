import React from "react";
const CartItemsContext = React.createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (item) => {},
  totalAmount: 0,
  totalItems: 0,
});

export default CartItemsContext;
