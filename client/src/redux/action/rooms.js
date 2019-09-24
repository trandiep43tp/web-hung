import * as types from '../constrants/actionType';

//act fetch room home
export const actFecthRoomsHome = () => {
    return {
        type: types.FECTH_ROOMS_HOME
    }
}
export const actFecthRoomsHomeSuccess = rooms => {
    return {
        type: types.FECTH_ROOMS_HOME_SUCCESS,
        payload: {
            roomsHome: rooms
        }
    }
}
export const actFecthRoomsHomeError = error => {
    return {
        type: types.FECTH_ROOMS_HOME_ERROR,
        payload: {
            error
        }
    }
}

//act room page
export const actFecthRoomsPage = (search, pagination) => {
    return {
        type: types.FECTH_ROOMS_PAGE,
        payload: {
            search,
            pagination
        }
    }
}
export const actFecthRoomsPageSuccess = roomsPage => {
    return {
        type: types.FECTH_ROOMS_PAGE_SUCCESS,
        payload: {
            roomsPage
        }
    }
}
export const actFecthRoomsPageError = error => {
    return {
        type: types.FECTH_ROOMS_PAGE_ERROR,
        payload: {
            error
        }
    }
}

// act count rooms
export const actFecthCountRooms = (search) => {
    return {
        type: types.FECTH_COUNT_ROOMS,
        payload: {
            search
        }
    }
}
export const actFecthCountRoomsSuccess = countRooms => {
    return {
        type: types.FECTH_COUNT_ROOMS_SUCCESS,
        payload: {
            countRooms
        }
    }
}
export const actFecthCountRoomsError = error => {
    return {
        type: types.FECTH_COUNT_ROOMS_ERROR,
        payload: {
            error
        }
    }
}
//act changeCurrentpage
export const actChangeCurrentPageRoom = (page) =>{
    return {
        type: types.CHANGE_CURRENT_PAGE_ROOM,
        payload: {
            page
        }
    }
}

// act fecth roomdetail
export const actfechRoomDetail = slug => {
    return {
        type: types.FECTH_ROOM_DETAIL,
        payload: {
            slug
        }
    }
}
export const actfechRoomDetailSuccess = roomDetail => {
    return {
        type: types.FECTH_ROOM_DETAIL_SUCCESS,
        payload: {
            roomDetail
        }
    }
}
export const actfechRoomDetailError = error => {
    return {
        type: types.FECTH_ROOM_DETAIL_ERROR,
        payload: {
            error
        }
    }
}

// act fetch room orther
export const actfecthRoomOrther = slug => {
    return {
        type: types.FECTH_ROOM_ORTHER,
        payload: {
            slug
        }
    }
}
export const actfecthRoomOrtherSuccess = roomsOther => {
    return {
        type: types.FECTH_ROOM_ORTHER_SUCCESS,
        payload: {
            roomsOther
        }
    }
}
export const actfecthRoomOrtherEror = error => {
    return {
        type: types.FECTH_ROOM_ORTHER_ERROR,
        payload: {
            error
        }
    }
}

// change search
export const actChangeSearchRoom = search =>{    
    return { 
        type: types.SEARCH_ROOM,
        payload: {
            search
        }
    }    
}
export const actChangeSearchRoomName = name =>{    
    return { 
        type: types.SEARCH_NAME_ROOM,
        payload: {
            name
        }
    }    
}
