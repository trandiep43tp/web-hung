import * as types   from '../constrants/actionType';

//fecth blogsHome
export const actFecthBlogsHome = () =>{
    return {
        type: types.FECTH_BLOGS_HOME
    }
}
// export const actFecthBlogsHomeSuccess = blogs =>{
//     return {
//         type: types.FECTH_BLOGS_HOME_SUCCESS,
//         payload: {
//             blogsHome: blogs 
//         }
//     }
// }

// export const actFecthBlogsHomeError = error =>{
//     return {
//         type: types.FECTH_BLOGS_HOME_ERROR,
//         payload: {
//             error
//         }
//     }
// }

// fetch blog recent
export const actFechBlogResent = () =>{
    return {
        type: types.FECTH_BLOG_RECENT
    }
}
// export const actFechBlogResentSuccess = blogs =>{
//     return {
//         type: types.FECTH_BLOG_RECENT_SUCCESS,
//         payload: {
//             blogsRecent: blogs
//         }
//     }
// }
// export const actFechBlogResentError = error =>{
//     return {
//         type: types.FECTH_BLOG_RECENT_ERROR,
//         payload: {
//             error
//         }
//     }
// }

// act fecth blogpage
export const actfechBlogsPage = (search, pagination) =>{
    return { 
        type: types.FECTH_BLOGS_PAGE,
        payload: {
            search,
            pagination
        }
    }
}
// export const actfechBlogsPageSuccess = blogs =>{
//     return { 
//         type: types.FECTH_BLOGS_PAGE_SUCCESS,
//         blogs
//     }
// }
// export const actfechBlogsPageError = error =>{
//     return { 
//         type: types.FECTH_BLOGS_PAGE_ERROR,
//         payload: {
//             error
//         }
//     }
// }

// act count blog
export const actfechCountBlogs = (search) =>{
    return {
        type: types.FECTH_COUNT_BLOGS,
        payload: {
            search
        }
    }
}
// export const actfechCountBlogsSuccess = countBlog =>{
//     return {
//         type: types.FECTH_COUNT_BLOGS_SUCCESS,
//         payload: {
//             countBlog
//         }
//     }
// }
// export const actfechCountBlogsError = error =>{
//     return {
//         type: types.FECTH_COUNT_BLOGS_ERROR,
//         payload: {
//             error
//         }
//     }
// }

// act change curent blog
export const actChangeCurrentPageBlog = page =>{    
    return {
        type: types.CHANGE_CURRENT_PAGE_BLOG,
        payload: {
            pageBlog: page
        }
    }
}
export const actfechBlogDetail = slug => {
    return {
        type: types.FECTH_BLOG_DETAIL,
        payload: {
            slug
        }
    }
}

//change search blog
export const actChangeSearchBlog = search =>{    
    return { 
        type: types.SEARCH_BLOG,
        payload: {
            search
        }
    }    
}
