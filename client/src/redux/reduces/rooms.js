
import * as types   from '../constrants/actionType';

let initialState = {
    roomsPage : [],
    roomsHome : [],
    roomsOther : [],
    roomSearch : {
            price_min: '',
            price_max: '',
            name: '',
            districtId: 'novalue',
            sort: 'novalue'
    },
    roomDetail: {}
}
      
const rooms = (state = initialState, action) =>{   

    switch(action.type){     
        case types.FECTH_ROOMS_HOME:
            return {
                ...state
            }
        case types.FECTH_ROOMS_HOME_SUCCESS:
            const {roomsHome} = action.payload;
            return {
                ...state,
                roomsHome
            }
        case types.FECTH_ROOMS_HOME_ERROR:
            return {
                ...state
            }

        case types.FECTH_ROOMS_PAGE:             
            return {
                ...state
            }  
        case types.FECTH_ROOMS_PAGE_SUCCESS:
            const {roomsPage} = action.payload;
            return {
                ...state,
                roomsPage
            }
        case types.FECTH_ROOMS_PAGE_ERROR:
            return {
                ...state
            }
        case types.FECTH_ROOM_DETAIL:
            return {
                ...state
            }
        case types.FECTH_ROOM_DETAIL_SUCCESS:
            const {roomDetail} = action.payload;
            return {
                ...state,
                roomDetail
            }
        case types.FECTH_ROOM_DETAIL_ERROR: 
            return {
                ...state
            }
        case types.FECTH_ROOM_ORTHER:
            return {
                ...state
            }
        case types.FECTH_ROOM_ORTHER_SUCCESS:
            const { roomsOther} = action.payload;
            return {
                ...state,
                roomsOther
            }
        case types.FECTH_ROOM_ORTHER_ERROR:
            return {
                ...state
            }
        case types.SEARCH_ROOM:
            const { search } = action.payload;
            const roomSearch ={
                price_min: search.price_min,
                price_max: search.price_max,
                name: '',
                districtId: search.districtId,
                sort: search.sort
            }
            return {
                ...state,
                roomSearch
            }
        case types.SEARCH_NAME_ROOM:
            const { name} = action.payload;
            const roomSearchName ={
                price_min: '',
                price_max: '',
                name,
                districtId: 'novalue',
                sort: 'novalue'
            }
            return {
                ...state,
                roomSearch: roomSearchName
            }
        default:
            return state;
    }
}

export default rooms;