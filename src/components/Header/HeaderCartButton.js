import React, { useContext, useEffect, useState, useCallback } from "react";
import classes from "./HeaderCartButton.module.css";
import { FaShoppingCart } from "react-icons/fa";
import CartItemsContext from "../../store/cart-items";
import Wrapper from "../UI/Wrapper";
import Cart from "../Cart/Cart";

const HeaderCartButton = (props) => {
  const ctx = useContext(CartItemsContext);
  const [showModal, setShowModal] = useState(false);
  const [dumpBtn, setBumpBtn] = useState(false);
  const showModalHandler = useCallback(() => {
    setShowModal(true);
  }, []);
  const hideModalHandler = useCallback(() => {
    setShowModal(false);
  }, []);

  useEffect(() => {
    if (ctx.totalItems === 0) {
      return;
    }
    setBumpBtn(true);
    const timer = setTimeout(() => {
      setBumpBtn(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [ctx.totalItems]);

  return (
    <Wrapper>
      <button
        className={`${classes.button} ${dumpBtn ? classes.bump : ""}`}
        onClick={showModalHandler}
      >
        <FaShoppingCart className={classes.icon} />
        <span>Your Cart</span>
        <span className={classes.badge}>{ctx.totalItems}</span>
      </button>
      {showModal && <Cart hideModal={hideModalHandler} />}
    </Wrapper>
  );
};

export default HeaderCartButton;
