import {  call, put } from 'redux-saga/effects';
import CallApi      from '../Services/ApiCaller_1';
import * as types from '../redux/constrants/actionType';

//chú ý tất cả các hàm sử lý cho blog đều put {type: type, data} -> đi thẳng vào reduces để phân tích
export function* funcFecthBlogHome(){
    const args = ['blogs/bloghome', 'GET', null];
    try {
        const resp = yield call(CallApi, ...args);
        const { data }= resp
        yield put({type: types.FECTH_BLOGS_HOME_SUCCESS, data})
    }
    catch(error){
        console.log(" saga blog home lỗi")
    }
}
export function* funcFecthBlogRecent(){
    const args = ['blogs/blogrecent', 'GET', null];
    try {
        const resp = yield call(CallApi,...args);
        const { data } = resp;
        yield put({type: types.FECTH_BLOG_RECENT_SUCCESS, data})
    }
    catch(error){
        console.log("saga loi blog recent")
    }
}
export function* funcFecthCountBlog({payload}){
    const args = ['blogs/blogcount', 'GET'];
   try{
       const resp = yield call(CallApi,...args, payload);
       const { data} = resp;
       yield put({type: types.FECTH_COUNT_BLOGS_SUCCESS, data});
   }
   catch(error){
       console.log("saga count blog error")
   }
}
export function* funcFecthBlogPage({payload}){
    const args = ['blogs/blogpage', 'GET'];
    try {
        const resp = yield call(CallApi,...args, payload);
        const { data } = resp;
        yield put({type: types.FECTH_BLOGS_PAGE_SUCCESS, data})
    }
    catch(error){
        console.log("saga blogsPage error");
    }
}
export function* funcFecthBlogDetail({payload}){
    const args = ['blogs/blogdetail', 'GET'];
    try{
        const resp = yield call(CallApi, ...args, payload);
        const { data} = resp;
        yield put({type: types.FECTH_BLOG_DETAIL_SUCCESS, data})
    }
    catch(error){
        console.log("saga blogDetail error");
    }
}