const displayGamesSearch = (state = [], action) => {
    switch (action.type) {
      case 'DISPLAY_SEARCH':
        return  action.payload;
      case 'RESET':
        return [];
      default:
        return state;
    }
  };

  export default displayGamesSearch;
  