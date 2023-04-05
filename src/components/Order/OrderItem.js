import classes from "./OrderItem.module.css";
const OrderItem = (props) => {
  return (
    <tr
      className={
        classes.orderItem +
        " " +
        (props?.className === null ? "" : props.className)
      }
      key={props.key}
    >
      <td className={classes.name}>{props.name}</td>
      <td className={classes.amount}>{props.amount}</td>
      <td className={classes.price}>${props.price}</td>
    </tr>
  );
};

export default OrderItem;
