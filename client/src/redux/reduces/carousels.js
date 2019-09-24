
import * as types   from '../constrants/actionType';

let initialState = {
    listCarousels: [],
    imagePanel: [{
        name      : 'Welcome To Deluxe',
        content_1 :"Welcome To Deluxe",
        content_2 :"Hotels &amp; Resorts",
        image     : 'bg_1.jpg'
    }]
}
   
const carousel = (state = initialState, action) =>{

    switch(action.type){  
        case types.FECTH_CAROUSEL:          
             return {
                 ...state
             } 
        case types.FECTH_CAROUSEL_SUCCESS:   
            const { carousels } = action.payload;
            return {
                ...state,
                listCarousels: carousels,
            }
        case types.FECTH_CAROUSEL_ERROR:
            return {
                ...state,
                listCarousels: []
            }
        case types.FECTH_IMAGE_PANEL:
            return {
                ...state
            }
        case types.FECTH_IMAGE_PANEL_SUCCESS:
            const { image } = action.payload;
            return {
                ...state,
                imagePanel: image
            }
        case types.FECTH_IMAGE_PANEL_ERROR:
            return {
                ...state
            }

        default:
            return state;
    }
}

export default carousel;