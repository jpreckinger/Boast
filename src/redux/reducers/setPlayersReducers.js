const setPlayers = (state = [], action) => {
    switch (action.type) {
      case 'SET_PLAYERS':
        return  [...state, action.payload];
      default:
        return state;
    }
  };

  export default setPlayers;
  