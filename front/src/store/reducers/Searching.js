const Searching = (state = { search: "" }, action) => {
  switch (action.type) {
    case "SEARCH":
      console.log("hh");
      console.log(state);
      return {
        search: action.payload,
      };
    default:
      return state;
  }
};
export default Searching;
