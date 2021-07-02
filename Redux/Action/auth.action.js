import {addConstants} from './constance';

export const addFav = data => {
   console.log(data, 'data from action');
  return async dispatch => {
    dispatch({type: addConstants.ADD_FAV, payload:data});
   
    };
   
}


