const SearchClass = (state = { ClassID: "" }, action) => {
  switch (action.type) {
    case "EDIT_CLASS":
      console.log("hhkjhni");
      console.log(state);
      return {
        ClassID: action.payload,
      };
    default:
      return state;
  }
};
export default SearchClass;
