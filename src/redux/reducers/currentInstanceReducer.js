const currentInstanceId = (state = {}, action) => {
    switch (action.type) {
      case 'STORE_INSTANCE_ID':
        return  action.payload;
      case 'RESET':
        return {};
      default:
        return state;
    }
  };

  export default currentInstanceId;
  