import React from "react";
import ReactDOM from "react-dom";
import classes from "../Cart/Cart.module.css";
import Wrapper from "./Wrapper";
import Card from "./Card";
const Modal = (props) => {
  return (
    <Wrapper>
      {ReactDOM.createPortal(
        <div className={classes.backdrop} onClick={props.onCloseCartModal}></div>,
        document.getElementById("backdrops-root")
      )}

      {ReactDOM.createPortal(
        <Card className={classes.modal}>{props.children}</Card>,
        document.getElementById("overlays-root")
      )}
    </Wrapper>
  );
};

export default Modal;
