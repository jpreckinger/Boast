const currentInstanceId = (state = {}, action) => {
    switch (action.type) {
      case 'STORE_INSTANCE_ID':
        return  action.payload;
      default:
        return state;
    }
  };

  export default currentInstanceId;
  