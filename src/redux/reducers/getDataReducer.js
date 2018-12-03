//this holds the stats for whatever page the user is on
//and is used to display the various pie charts
const getData = (state = [], action) => {
    switch (action.type) {
      case 'SET_DATA':
        return  action.payload;
      default:
        return state;
    }
  };

  export default getData;
  