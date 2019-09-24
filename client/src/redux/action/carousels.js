import * as types   from '../constrants/actionType';

// fetch carourel
export const actFecthCarousels = () =>{
    return { 
        type: types.FECTH_CAROUSEL
    }    
}

export const actFecthCarouselsSuccess = carousels =>{
    return { 
        type: types.FECTH_CAROUSEL_SUCCESS,
        payload: {
            carousels
        }        
    }    
}

export const actFecthCarouselsError = error =>{
    return { 
        type: types.FECTH_CAROUSEL_ERROR,
        payload: {
            error
        }        
    }    
}

//fetch imagePanel
export const actFecthImagePanel = () =>{
    return { 
        type: types.FECTH_IMAGE_PANEL
    }    
}

export const actFecthImagePanelSuccess = image =>{
    return { 
        type: types.FECTH_IMAGE_PANEL_SUCCESS,
        payload: {
            image
        }
    }    
}

export const actFecthImagePanelError = error =>{
    return { 
        type: types.FECTH_IMAGE_PANEL_ERROR,
        payload: {
            error
        }
    }    
}

