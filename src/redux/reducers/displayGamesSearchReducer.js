//this holds the response from the BGG API that displays on the addGamePage
const displayGamesSearch = (state = [], action) => {
    switch (action.type) {
      case 'DISPLAY_SEARCH':
        return  action.payload;
      default:
        return state;
    }
  };

  export default displayGamesSearch;
  