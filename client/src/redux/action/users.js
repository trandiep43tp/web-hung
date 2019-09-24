import * as types   from '../constrants/actionType';
import CallApi      from '../../Services/ApiCaller';


//lấy dữ liệu từ nơi lưu trữ về và lưu vào trong store
export const actFecthUsersHomeRequest = () =>{
    return async (dispacth) =>{ 
          return await CallApi('users', 'GET', null).then( (res) => {              
              if(res !== undefined && res.status === 200 ){                 
                    dispacth(actFecthUsers(res.data))                  
              }                    
          });
    };
}

export const actFecthUsers = (users) =>{
    return { 
        type: types.FECTH_USERS_HOME,
        users
    }    
}

// export const actFecthUsersHomeRequest = () => dispatch => {
//     return fetch('/api/users/items-home')
//       .then(res => res.json())
     
//     //   .then(customers => dispatch({type: GET_CUSTOMERS, payload: customers}))
      
//        .then(customers =>dispatch(actFecthUsers(customers)))
//   }