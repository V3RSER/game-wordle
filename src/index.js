import React from "react";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/index.css";
import { render } from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import reducer from "./reducers/rootReducer";

import { composeWithDevTools } from "redux-devtools-extension";

console.log(process.env.PUBLIC_URL);
const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
