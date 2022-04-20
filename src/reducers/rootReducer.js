import { combineReducers } from "redux";
import element from "./elementReducer";

const reducer = combineReducers({
  element: element,
});

export default reducer;
