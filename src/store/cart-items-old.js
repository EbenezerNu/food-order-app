import React, { useContext } from "react";
const CartItemsContext = React.createContext([]);

const CartItemsContextProvider = (props) => {
  const [cart, setCart] = React.useState([]);

  const addItemToCart = (newItem) => {
    setCart([...cart, newItem]);
  };

  return (
    <CartItemsContext.Provider value={[...cart]}>
      {props.children}
    </CartItemsContext.Provider>
  );
};

const useCartItemsContext = () => useContext(CartItemsContext);

export { CartItemsContextProvider, CartItemsContext, useCartItemsContext };
