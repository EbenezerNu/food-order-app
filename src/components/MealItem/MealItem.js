import React, { useContext, useRef } from "react";
import classes from "./MealItem.module.css";
import Input from "../UI/Input";
import Button from "../UI/Button";
import CartItemsContext from "../../store/cart-items";

// import Wrapper from "../UI/Wrapper";
const MealItem = (props) => {
  const amountRef = useRef();
  const ctxCart = useContext(CartItemsContext);
  const addToCartHandler = (e) => {
    console.log("Adding meal to cart... ", amountRef.current.inputValue);
    e.preventDefault();
    if (+amountRef.current.inputValue > 0) {
      ctxCart.addItem({
        id: props.id + "_cart",
        name: props.name,
        price: props.price,
        amount: +amountRef.current.inputValue,
      });
    }
  };

  return (
    <div className={classes.meal}>
      <div className={classes.col}>
        <h3>{props.name}</h3>
        <p>{props.description}</p>
        <div className={classes.price}>${props.price}</div>
      </div>
      <div className={classes.col}>
        <Input ref={amountRef} value="1" type="number" label="Amount" min="0" />
        <Button
          type="button"
          text="+ Add"
          title="Add to Cart"
          onClick={addToCartHandler}
        />
      </div>
    </div>
  );
};

export default MealItem;
