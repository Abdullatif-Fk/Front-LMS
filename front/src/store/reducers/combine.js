import { combineReducers } from "redux";
import Searching from "./Searching";
import EditID from "./EditID";
import SearchClass from "./SearchClass";
import SectionID from "./SectionID";
export default combineReducers({
  SearchClass,
  Searching,
  EditID,
  SectionID,
});
