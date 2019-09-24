
import * as types   from '../constrants/actionType';


let initialState = {
    price_min: '',
    price_max: '',
    name: '',
    districtId: 'novalue',
    sort: 'novalue'
}; 
    
 
const roomsSearch = (state = initialState, action) =>{
    
    switch(action.type){     
        case types.SEARCH_ROOM:         
            let search = action.search; 
            state = {
                price_min: search.price_min,
                price_max: search.price_max,
                name     : search.name,
                district : search.district,
                sort     : search.sort
            }       
            return state ;  
        default:
            return state;
    }
}

export default roomsSearch;