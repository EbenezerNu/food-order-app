import React from "react";
import DUMMY_MEALS from "./defaultMeals";
const MealsContext = React.createContext([...DUMMY_MEALS]);

export default MealsContext;
