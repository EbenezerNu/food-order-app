import classes from "./Button.module.css";
const Button = (props) => {
  return (
    <button
      type={props.type || "button"}
      onClick={props.onClick || (() => {})}
      className={classes.button + " " + props?.className}
      title={props.title}
    >
      {props.text}
    </button>
  );
};

export default Button;
