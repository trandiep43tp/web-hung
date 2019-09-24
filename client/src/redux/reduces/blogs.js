
import * as types   from '../constrants/actionType';

let initialState = {
    blogsPage: [],
    blogsHome: [],
    blogsOther: [],
    blogSearch: {
        name: '' 
    },
    blogDetail: {},
    blogsRecent: []
};   
const blogs = (state = initialState, action) =>{   
   
    switch(action.type){     
        case types.FECTH_BLOGS_HOME:
            return {
                ...state
            }
        case types.FECTH_BLOGS_HOME_SUCCESS:
            const blogsHome  = action.data;
            return {
                ...state,
                blogsHome
            }
        case types.FECTH_BLOGS_HOME_ERROR:
            return {
                ...state
            }
        case types.FECTH_BLOG_RECENT:
            return {
                ...state
            }
        case types.FECTH_BLOG_RECENT_SUCCESS:
            const blogsRecent  = action.data;
            return {
                ...state,
                blogsRecent
            }
        case types.FECTH_BLOG_RECENT_ERROR:
            return {
                ...state
            }
        case types.FECTH_BLOGS_PAGE:
            return {
                ...state
            }
        case types.FECTH_BLOGS_PAGE_SUCCESS:
            const blogsPage = action.data;
            return {
                ...state,
                blogsPage
            }
        case types.FECTH_BLOG_DETAIL:
            return {
                ...state
            }
        case types.FECTH_BLOG_DETAIL_SUCCESS:
            const blogDetail = action.data;
            return {
                ...state,
                blogDetail
            }
        case types.SEARCH_BLOG:
            const {search} = action.payload;
            return {
                ...state,
                blogSearch: {
                    ...state.blogSearch,
                    name: search
                }
            }
        default:
            return state;
    }
}

export default blogs;