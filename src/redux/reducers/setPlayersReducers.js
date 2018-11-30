const setPlayers = (state = [], action) => {
    switch (action.type) {
      case 'SET_PLAYERS':
        return  [...state, action.payload];
      case 'RESET_PLAYERS':
        return [];
      case 'RESET':
        return [];
      default:
        return state;
    }
  };

  export default setPlayers;
  