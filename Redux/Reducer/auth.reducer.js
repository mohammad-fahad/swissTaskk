import {addConstants} from '../Action/constance';

const initState = {
  
  favoriteItem:[]
};
 const AddFavorite = (state = initState, action) => {
  console.log(action.payload, "action payload from reducer");

  switch (action.type) {
    case addConstants.ADD_FAV:
      return {
        ...state,

        favoriteItem: JSON.parse(JSON.stringify(action.payload)),
      };
    default:
      return state;
  }
  
};
export default AddFavorite;