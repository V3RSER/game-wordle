import { combineReducers } from "redux";
import elementList from "./elementListReducer";

const reducer = combineReducers({
  elementList: elementList,
});

export default reducer;
