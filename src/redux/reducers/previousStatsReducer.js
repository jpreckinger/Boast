const previousStats = (state = {users: [], notes: [], scores: []}, action) => {
    switch (action.type) {
      case 'SET_PREVIOUS_STATS':
        return  action.payload;
      case 'RESET':
        return {users: [], notes: [], scores: []};
      default:
        return state;
    }
  };

  export default previousStats;
  