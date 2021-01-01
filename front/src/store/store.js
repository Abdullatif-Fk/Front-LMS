import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/combine";
const middleware = [thunk];
export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(...middleware));
}
