import * as types   from '../constrants/actionType';
//import {toastError} from '../../helpers/toastHelper';

let initialState = false;
      
const loading = (state = initialState, action) =>{   
    switch(action.type){     
        case types.SHOW_LOADING:            
            return true;
        case types.HIDE_LOADING:      
            return false;        
        default:
            return state;
    }
}

export default loading ; 