import React, { useReducer } from "react";
import CartItemsContext from "./cart-items";

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    if (+action.val.amount > 0) {
      let index = getCartItem(state.items, action.val.name);
      console.log("GetCartItem : ", index);
      if (index === -1) {
        state.items.push({
          id: action.val.id,
          name: action.val.name,
          price: action.val.price,
          amount: +action.val.amount,
        });
      } else {
        state.items[index].amount += +action.val.amount;
      }
    }
  } else if (action.type === "UPDATE") {
    let index = getCartItem(state.items, action.val.name);
    if (+action.val.amount <= 0) {
      state.items = state.items.filter(
        (item) => item.name.trim() !== action.val.name.trim()
      );
    } else {
      state.items[index].amount = +action.val.amount;
    }
  } else if (action.type === "REMOVE") {
    state.items = state.items.filter(
      (item) => item.name.trim() !== action.val.name.trim()
    );
  }

  return {
    items: state.items,
    totalAmount: calcTotalAmount(state.items),
    totalItems: calcTotalItems(state.items),
  };
};

const calcTotalAmount = (items) => {
  let total = 0;
  if (items.length > 0) {
    items.forEach((item) => {
      total += Number(item.price) * Number(item.amount);
    });
  }
  return total;
};

const calcTotalItems = (items) => {
  let itemNo = 0;
  console.log("Context Cart : ", items);
  items.forEach((item) => {
    itemNo += +item.amount;
  });
  return itemNo;
};

const getCartItem = (ctx, name) => {
  for (let i = 0; i < ctx.length; i++) {
    if (ctx[i].name.trim() === name.trim()) {
      return i;
    }
  }
  return -1;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
    totalItems: 0,
  });

  // const ctx = useContext(CartItemsContext);
  const addItemHandler = (item) => {
    if (item.type === "CART_UPDATE") {
      dispatchCartState({ val: item, type: "UPDATE" });
    } else {
      dispatchCartState({ val: item, type: "ADD" });
    }
  };

  const removeItemHandler = (item) => {
    // let index = getCartItem(cartState.items, item.name);
    dispatchCartState({ val: item, type: "REMOVE" });
    // if (index !== -1) {
    //   // ctx.items[index].remove();
    // }
  };

  // useEffect(() => {
  //   console.log("Calculating total price");
  //   dispatchCartState({ type: "CHECK_TOTAL" });
  // }, [cartState.items]);

  const ctxValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    totalItems: cartState.totalItems,
    addItem: (item) => addItemHandler(item),
    removeItem: (item) => removeItemHandler(item),
  };

  return (
    <CartItemsContext.Provider value={ctxValue}>
      {props.children}
    </CartItemsContext.Provider>
  );
};

export default CartProvider;
