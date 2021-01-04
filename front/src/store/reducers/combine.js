import { combineReducers } from "redux";
import Searching from "./Searching";
import EditID from "./EditID";
import SearchClass from "./SearchClass";

export default combineReducers({
  SearchClass,
  Searching,
  EditID,
});
