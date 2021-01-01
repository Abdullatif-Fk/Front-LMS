const EditID = (state = { ID: "" }, action) => {
  switch (action.type) {
    case "EDIT":
      console.log(state);
      return {
        ID: action.payload,
      };
    default:
      return state;
  }
};
export default EditID;
