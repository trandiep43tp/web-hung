
import * as types   from '../constrants/actionType';


let initialState = {   
    name: ''  
};
    
 
const blogsSearch = (state = initialState, action) =>{
    
    switch(action.type){     
        case types.SEARCH_BLOG:         
            let search = action.search; 
            state = {               
                name: search.name              
            }       
            return state ;  
        default:
            return state;
    }
} 

export default blogsSearch;