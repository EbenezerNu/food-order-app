import React from "react";
import classes from "./MealsSummary.module.css";
const MealsSummary = (props) => {
  return (
    <div className={classes.summary + " " + classes.col}>
      <h2>Delicious Food, Delivered To Your Home</h2>
      <span>
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </span>
      <span>
        All our meals are cooked with high-quality inredients, just-in-time and
        of course by experienced chefs!
      </span>
    </div>
  );
};

export default React.memo(MealsSummary);
