const SectionID = (state = { SectionID: "" }, action) => {
  switch (action.type) {
    case "EDIT_SECTION":
      console.log(state);
      return {
        SectionID: action.payload,
      };
    default:
      return state;
  }
};
export default SectionID;
