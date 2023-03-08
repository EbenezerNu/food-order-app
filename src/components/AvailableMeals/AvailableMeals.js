import React, { useContext } from "react";
import classes from "./AvailableMeals.module.css";
import Wrapper from "../UI/Wrapper";
import MealItem from "../MealItem/MealItem";
import MealsContext from "../../store/mealsContext";
const AvailableMeals = (props) => {
  const ctxMeals = useContext(MealsContext);
  console.log("Inside Available Meals");
  return (
    <Wrapper>
      <div className={classes.meals}>
        <ul>
          {ctxMeals.length > 0 &&
            ctxMeals.map((meal) => {
              return (
                <MealItem
                  key={meal.id}
                  id={meal.id}
                  name={meal.name}
                  description={meal.description}
                  price={meal.price}
                />
              );
            })}
        </ul>
      </div>
    </Wrapper>
  );
};

export default React.memo(AvailableMeals);
