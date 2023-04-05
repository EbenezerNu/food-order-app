import React, { useImperativeHandle, useRef, useState } from "react";
import classes from "./Input.module.css";
const Input = React.forwardRef((props, ref) => {
  const [enteredAmount, setEnteredAmount] = useState(props?.value || 0);
  const InputRef = useRef();
  useImperativeHandle(ref, () => {
    return { inputValue: enteredAmount };
  });
  return (
    <div className={classes.input}>
      <label>{props?.label}</label>
      <input
        ref={InputRef}
        type={props?.type === null ? "text" : props?.type}
        onClick={props?.onClick}
        value={enteredAmount}
        onChange={(e) => {
          setEnteredAmount(e.target.value);
        }}
        min={props.min}
      />
    </div>
  );
});

export default Input;
