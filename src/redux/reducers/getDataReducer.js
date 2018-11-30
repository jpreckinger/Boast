const getData = (state = [], action) => {
    switch (action.type) {
      case 'SET_DATA':
        return  action.payload;
      case 'RESET':
        return [];
      default:
        return state;
    }
  };

  export default getData;
  