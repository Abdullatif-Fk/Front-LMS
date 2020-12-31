import { createStore } from "redux";

import rootReducer from "./reducers/combine";
export default function configureStore() {
  return createStore(rootReducer);
}
