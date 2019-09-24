import * as types   from '../constrants/actionType';

export const actFecthContact = (contact) =>{
    return { 
        type: types.FECTH_CONTACT,
        payload: {
            contact
        }
    }    
}
export const actFecthContactSuccess = () =>{
    return { 
        type: types.FECTH_CONTACT_SUCCESS
    }    
}
export const actFecthContactEror = error =>{
    return { 
        type: types.FECTH_CONTACT_ERROR,
        payload: {
            error            
        }
    }    
}



