const previousStats = (state = {users: [], notes: [], scores: []}, action) => {
    switch (action.type) {
      case 'SET_PREVIOUS_STATS':
        return  action.payload;
      default:
        return state;
    }
  };

  export default previousStats;
  