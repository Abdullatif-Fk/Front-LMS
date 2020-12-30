const simpleReducer = (state = { result: "okk" }, action) => {
  switch (action.type) {
    case "SIMPLE_ACTION":
      console.log("hh");
      console.log(state);
      return {
        result: action.payload,
      };
    default:
      return state;
  }
};
export default simpleReducer;
