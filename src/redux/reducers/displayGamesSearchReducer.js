const displayGamesSearch = (state = [], action) => {
    switch (action.type) {
      case 'DISPLAY_SEARCH':
      console.log('paylaod in reducer', action.payload);
        return  action.payload;
      default:
        return state;
    }
  };

  export default displayGamesSearch;
  