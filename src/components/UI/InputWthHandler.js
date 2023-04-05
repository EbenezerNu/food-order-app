import classes from "./Input.module.css";
const InputWithHandler = (props) => {
  const isTextArea = props?.isTextArea === null ? false : props?.isTextArea;
  return (
    <div
      className={
        classes.input + " " + (props?.className == null ? "" : props.className)
      }
    >
      <label>{props?.label}</label>
      {!isTextArea && (
        <input
          type={props?.type === null ? "text" : props?.type}
          name={props?.name === null ? "" : props?.name}
          value={props?.value}
          onChange={props?.onChange}
        />
      )}
      {isTextArea && (
        <textarea
          name={props?.name === null ? "" : props.name}
          value={props?.value}
          onChange={props?.onChange}
        />
      )}
    </div>
  );
};

export default InputWithHandler;
