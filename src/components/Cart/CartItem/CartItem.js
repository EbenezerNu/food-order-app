import React, { useEffect, useRef } from "react";
import classes from "./CartItem.module.css";
const CartItem = (props) => {
  // const [amount, setAmount] = useState(+props.amount);
  const amountRef = useRef(props.amount);
  const increaseAmounthandler = (e) => {
    e.preventDefault();
    amountRef.current.innerHTML = Number(amountRef.current.innerHTML) + 1;
    console.log("Element : ", amountRef.current.innerHTML);
    // setAmount(amount + 1);
    props.onChangeAmount({
      name: props.name,
      amount: +amountRef.current.innerHTML,
      type: "CART_UPDATE",
    });
  };

  const decreaseAmounthandler = (e) => {
    e.preventDefault();
    console.log("Element : ", amountRef.current.innerHTML);
    amountRef.current.innerHTML = Number(amountRef.current.innerHTML) - 1;
    if (+amountRef.current.innerHTML <= 0) {
      amountRef.current.innerHTML = "0";
    }

    // else {
    //   setAmount(amount - 1);
    // }
    props.onChangeAmount({
      name: props.name,
      amount: +amountRef.current.innerHTML,
      type: "CART_UPDATE",
    });
  };

  useEffect(() => {
    amountRef.current.innerHTML = props.amount;
  }, [props.amount]);

  return (
    <div className={classes["cart-item"]}>
      <div className={classes.col}>
        <h2>{props.name}</h2>
        <div className={classes.row + " " + classes.summary}>
          <span className={classes.price}>${props.price}</span>
          <span className={classes.amount}>
            x <span ref={amountRef}></span>
          </span>
        </div>
      </div>
      <div className={classes.row + " " + classes.actions}>
        <button
          type="button"
          className={classes.button}
          onClick={decreaseAmounthandler}
        >
          -
        </button>
        <button
          type="button"
          className={classes.button}
          onClick={increaseAmounthandler}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
