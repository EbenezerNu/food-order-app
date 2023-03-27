import React, { useContext, useEffect, useState } from "react";
import classes from "./App.module.css";
import Header from "./components/Header/Header";
import MealsContext from "./store/mealsContext";
// import DUMMY_MEALS from "./store/defaultMeals";
import AvailableMeals from "./components/AvailableMeals/AvailableMeals";
import MealsSummary from "./components/MealsSummary/MealsSummary";
import CartProvider from "./store/CartProvider";
// import Card from "./components/UI/Card";
function App() {
  const ctxMeals = useContext(MealsContext);
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  console.log("Context : ", ctxMeals);

  useEffect(() => {
    try {
      setIsLoading(true);
      const fetchMeals = async () => {
        try {
          const new_meals = await fetch(
            "https://react-http-d4113-default-rtdb.firebaseio.com/meals.json"
          );
          if (new_meals === undefined || !new_meals.ok) {
            throw Error("Failed to fetch meals");
          }
          const mealsJson = await new_meals.json();
          let fetchedMeals = [];
          for (const key in mealsJson) {
            fetchedMeals.push({
              id: key,
              name: mealsJson[key].name,
              description: mealsJson[key].description,
              price: mealsJson[key].price,
            });
          }
          setMeals(fetchedMeals);
          setError("");
          setIsLoading(false);
        } catch (error) {
          setError(error.message);
          setIsLoading(false);
        }
      };

      fetchMeals();
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  }, []);

  return (
    <MealsContext.Provider value={meals}>
      <CartProvider>
        <Header />
        <div className={classes.col + " " + classes.body}>
          <MealsSummary></MealsSummary>
          {isLoading && (
            <div className={classes.loading}>
              <p>Loading ...</p>
            </div>
          )}
          {!isLoading && error !== "" && (
            <div className={classes.error}>
              <p>{error}</p>
            </div>
          )}
          {!isLoading && error === "" && meals?.length === 0 && (
            <div className={classes.no_meal}>
              <p>No Meals Available</p>
            </div>
          )}
          {!isLoading && meals.length > 0 && <AvailableMeals />}
        </div>
      </CartProvider>
    </MealsContext.Provider>
  );
}

export default App;
