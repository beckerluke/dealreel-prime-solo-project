const adminDealsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ADMIN_DEALS':
        return action.payload;
      default:
        return state;
    }
  };

  export default adminDealsReducer;