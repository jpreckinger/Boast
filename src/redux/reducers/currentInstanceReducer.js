//this reducer holds on to the current instance id
const currentInstanceId = (state = {}, action) => {
    switch (action.type) {
      case 'STORE_INSTANCE_ID':
        return  action.payload;
      default:
        return state;
    }
  };

  export default currentInstanceId;
  