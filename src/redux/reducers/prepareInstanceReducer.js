const prepareInstance = (state = [], action) => {
    switch (action.type) {
      case 'DISPLAY_CURRENT_GAME':
        console.log('in displaycurrentgame');
        return  action.payload;
      default:
        return state;
    }
  };

  export default prepareInstance;
  