
import * as types   from '../constrants/actionType';
import { toastError, toastSuccess } from '../toast';


let initialState = {
    name    : '',
    email   : '',
    subject : '',
    content : ''
}
   
const contact = (state = initialState, action) =>{

    switch(action.type){  
        case types.FECTH_CONTACT:
            const { contact } = action.payload;
           // state = contact
            return contact;
        case types.FECTH_CONTACT_SUCCESS:
            toastSuccess({message: 'Thanks !!!'});
            return initialState;
        case types.FECTH_CONTACT_ERROR:
            console.log(action)
            const { error} = action.payload;
            toastError(error)
            return state;
        default:
            return state;
    }
}

export default contact;