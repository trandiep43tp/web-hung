
import * as types   from '../constrants/actionType';

// let initialState = [
//     {
//         "group":{"name":"Guests"},
//         "_id":"5d43fa4744caea36cc0371e6",
//         "name":"hai dang",
//         "content":"<p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which&nbsp;roasted parts of sentences fly into your mouth.</p>\r\n",
//         "avatar":"bqsAuF2rrJ.jpg"
//     },
//     {
//         "group":{"name":"Admin"},
//         "_id":"5c9499e389c24f87c01eeda9",
//         "name":"trandiep",
//         "content":"<p>A small river named Duden flows by their place and supplies it&nbsp;with the necessary regelialia. It is a paradisematic country, in which&nbsp;roasted parts of sentences fly into your mouth.</p>\r\n",
//         "avatar":"Mg8zU8Oi0p.jpg"
//     }
// ];
    
// function findIndex(products, id){
// 	let result = -1;
// 	products.forEach((product, index ) => {
// 		if(product.id === id){
// 			result = index;
// 		}
// 	});
// 	return result;
// }
		
   
const usersHome = (state = [], action) =>{
    
    // let index = -1;
    // let id = ''
    switch(action.type){          
        case types.FECTH_USERS_HOME:   
                 
            state = action.users;
            return [...state];  

        // case types.DELETE_PRODUCT:
        //      id = action.id;
        //     index = findIndex(state, id);
        //     state.splice(index, 1);
        //     return [...state];

        // case types.ADD_PRODUCT:
        //     state.push(action.product);
        //     return [...state];
        // case types.UPDATE_PRODUCT:
        //     let { product } = action;
        //      id = action.product.id;
        //     index = findIndex(state, id);
        //     state[index] = product;      
        //     return [...state]; 

        default:
            return state;
    }
}

export default usersHome;