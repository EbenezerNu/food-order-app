import { useState, useContext } from "react";
import classes from "./Order.module.css";
import CartItemsContext from "../../store/cart-items";
// import OrderItem from "./OrderItem";
import InputWithHandler from "../../components/UI/InputWthHandler";
import Button from "../UI/Button";
import classesCart from "../Cart/Cart.module.css";

const Order = (props) => {
  const ctxCart = useContext(CartItemsContext);
  const [voucher, setVoucher] = useState("");
  const [address, setAddress] = useState(ctxCart.accounts?.address);
  const [cardNumber, setCardNumber] = useState(ctxCart.accounts?.cardNumber);
  const [cvv, setCVV] = useState(ctxCart.accounts?.cvv);
  const [name, setName] = useState(ctxCart.accounts?.name);
  const [city, setCity] = useState(ctxCart.accounts?.city);
  const [postalCode, setPostalCode] = useState(ctxCart.accounts?.postalCode);
  const [hasError, setHasError] = useState(true);

  const changeVoucherHandler = (e) => {
    e.preventDefault();
    setVoucher(e.target.value.toUpperCase());
    validateFieldsHandler();
  };

  const changeAddressHandler = (e) => {
    e.preventDefault();
    setAddress(e.target.value.toUpperCase());
    validateFieldsHandler();
  };

  const changeCardNumberHandler = (e) => {
    e.preventDefault();
    setCardNumber(e.target.value.toUpperCase());
    validateFieldsHandler();
  };

  const changeCVVHandler = (e) => {
    e.preventDefault();
    setCVV(e.target.value);
    validateFieldsHandler();
  };

  const changeNameHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
    validateFieldsHandler();
  };

  const changeCityHandler = (e) => {
    e.preventDefault();
    setCity(e.target.value);
    validateFieldsHandler();
  };

  const changePostalCodeHandler = (e) => {
    e.preventDefault();
    setPostalCode(e.target.value);
    validateFieldsHandler();
  };

  const confirmOrderHandler = (e) => {
    console.log("Ordering item in cart to Address");
    validateFieldsHandler();
    if (hasError) {
      alert("Please fill all the provided fields");
      return;
    }
    ctxCart.saveOrderDetails({
      name: name,
      city: city,
      postalCode: postalCode,
      address: address,
      cardNumber: cardNumber,
      cvv: cvv,
    });
    ctxCart.clearCart();
    props.closeCartModal();
  };

  const closeOrderPopupHandler = (e) => {
    props.closeOrder();
  };

  const isFieldEmpty = (field) => field?.trim() === "";
  const isFieldLength5OrMore = (field) => field?.trim().length >= 5;

  const validateFieldsHandler = () => {
    if (
      name?.trim() === "" ||
      city?.trim() === "" ||
      postalCode?.trim() === "" ||
      cvv?.trim() === "" ||
      address?.trim() === "" ||
      cardNumber?.trim() === "" ||
      voucher?.trim() === ""
    ) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  // useEffect(() => {
  //   validateFieldsHandler();
  // }, [cvv, cardNumber, address]);

  return (
    <div className={classes.order}>
      {/* {ctxCart.totalItems > 0 && (
        <table className={classes.orderItems}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {ctxCart.items?.length > 0 &&
              ctxCart.items.map((item) => (
                <OrderItem
                  key={item.id}
                  name={item?.name}
                  price={item?.price}
                  amount={item?.amount}
                />
              ))}
          </tbody>
        </table>
      )} */}

      <div className={classes.orderForm}>
        <InputWithHandler
          className={classes.name}
          label="Name"
          type="text"
          name="name"
          value={name}
          onChange={changeNameHandler}
        />
        <InputWithHandler
          className={classes.city}
          label="City"
          type="text"
          name="city"
          value={city}
          onChange={changeCityHandler}
        />
        <InputWithHandler
          isTextArea={true}
          label="Address"
          className={classes.address}
          name="address"
          value={address}
          onChange={changeAddressHandler}
        />
        <InputWithHandler
          className={classes.postalCode}
          label="Postal Code"
          type="text"
          name="postalCode"
          value={postalCode}
          onChange={changePostalCodeHandler}
        />
        <InputWithHandler
          className={classes.cardNumber}
          label="Card Number"
          type="text"
          name="cardNumber"
          value={cardNumber}
          onChange={changeCardNumberHandler}
        />

        <InputWithHandler
          className={classes.cvv}
          label="CVV"
          type="text"
          name="cvv"
          value={cvv}
          onChange={changeCVVHandler}
        />

        <InputWithHandler
          className={classes.voucher}
          label="Voucher"
          type="text"
          name="voucher"
          value={voucher}
          onChange={changeVoucherHandler}
        />
      </div>
      <div className={classesCart.actions}>
        <Button
          className={classesCart["button--alt"]}
          type="button"
          title="Back"
          text="Back"
          onClick={closeOrderPopupHandler}
        />
        {ctxCart.items.length > 0 && (
          <Button
            className={classesCart.button}
            type="button"
            title="Confirm Order"
            text="Confirm"
            onClick={confirmOrderHandler}
            {...(hasError && "disabled")}
          />
        )}
      </div>
    </div>
  );
};

export default Order;
