//this holds the data used to generate the bar charts on the game page
const previousStats = (state = {users: [], notes: [], scores: []}, action) => {
    switch (action.type) {
      case 'SET_PREVIOUS_STATS':
        return  action.payload;
      default:
        return state;
    }
  };

  export default previousStats;
  