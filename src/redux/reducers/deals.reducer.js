// All deals 
const dealsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_DEALS':
        return action.payload;
      default:
        return state;
    }
  };

  export default dealsReducer;