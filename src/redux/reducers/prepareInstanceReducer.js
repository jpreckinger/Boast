//this holds the current games image and id information for display and
//data logging purposes
const prepareInstance = (state = {}, action) => {
    switch (action.type) {
      case 'DISPLAY_CURRENT_GAME':
        return  action.payload;
      default:
        return state;
    }
  };

  export default prepareInstance;
  