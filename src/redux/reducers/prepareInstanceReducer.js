const prepareInstance = (state = {}, action) => {
    switch (action.type) {
      case 'DISPLAY_CURRENT_GAME':
        return  action.payload;
      case 'RESET':
        return {};
      default:
        return state;
    }
  };

  export default prepareInstance;
  