
import * as types   from '../constrants/actionType';

let initialState = {
    paginationRoom: {
        totalItems: 0,
        totalItemsperPage: 6,
        currentPage: 1,
        pageRanges: 3,
    },
    paginationBlog: {
        totalItems: 0,
        totalItemsperPage: 8,
        currentPage: 1,
        pageRanges: 3,
    }   
};    

   
const pagination = (state = initialState, action) =>{   
   
    switch(action.type){     
        case types.SEARCH_ROOM:
            const paginationRoom = state.paginationRoom;
            return {
                ...state,
                paginationRoom: {
                    ...paginationRoom,
                    currentPage: 1
                }
            }
        case types.FECTH_COUNT_ROOMS:
            return {
                ...state
            }
        case types.FECTH_COUNT_ROOMS_SUCCESS:
            const { countRooms } = action.payload; 
            const paginationRoomTemp1 = state.paginationRoom;
            return {
                ...state,
                paginationRoom: {
                    ...paginationRoomTemp1,
                    totalItems: countRooms
                }
            }
        case types.FECTH_COUNT_ROOMS_ERROR:
            return {
                ...state
            }
        case types.CHANGE_CURRENT_PAGE_ROOM:
            const { page } = action.payload;
            const paginationRoomTemp2 = state.paginationRoom;
            return {
                ...state,
                paginationRoom: {
                    ...paginationRoomTemp2,
                    currentPage: page
                }
            } 
        case types.CHANGE_CURRENT_PAGE_BLOG:
            const {pageBlog } = action.payload;
            const { paginationBlog } = state;
            return {
                ...state,
                paginationBlog: {
                   ...paginationBlog,
                   currentPage: pageBlog
                }
            }
        case types.FECTH_COUNT_BLOGS:
            return {
                ...state
            }
        case types.FECTH_COUNT_BLOGS_SUCCESS:
            const  countBlog  = action.data; 
            const paginationBlogTemp1 = state.paginationBlog;            
            return {
                ...state,
                paginationBlog: {
                    ...paginationBlogTemp1,
                    totalItems: countBlog
                }
            }
        case types.FECTH_COUNT_BLOGS_ERROR:
            return {
                ...state
            }
        case types.SEARCH_BLOG:
            const paginationBlogTemp2 = state.paginationBlog;
            return {
                ...state,
                paginationBlog: {
                    ...paginationBlogTemp2,
                    currentPage: 1
                }
            }
        default:
            return state;
    }
}

export default pagination;