import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <div className={classes.header}>
      <div>
        <h1>ReactMeals</h1>
      </div>
      <HeaderCartButton></HeaderCartButton>
    </div>
  );
};

export default Header;
