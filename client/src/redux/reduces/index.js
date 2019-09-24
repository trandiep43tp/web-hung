import {combineReducers }    from 'redux';
import { reducer as formReducer } from 'redux-form';
import rooms             from './rooms';
import blogs             from './blogs';
import usersHome         from './users-home';
import carousels         from './carousels';
import pagination        from './pagination';
import contact           from './contact';
import loading           from './loading';

const myReduce = combineReducers({    
    rooms, 
    blogs,
    usersHome,
    carousels,  
    pagination,
    contact,
    loading,
    form: formReducer
})

export default myReduce;
