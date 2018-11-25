const previousStats = (state = {stats: [], notes: []}, action) => {
    switch (action.type) {
      case 'SET_PREVIOUS_STATS':
        return  action.payload;
      default:
        return state;
    }
  };

  export default previousStats;
  