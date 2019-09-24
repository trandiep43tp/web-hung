import { takeLatest, call, put } from 'redux-saga/effects';
import * as types from '../redux/constrants/actionType';
import CallApi      from '../Services/ApiCaller_1';
import { actFecthContactSuccess, actFecthContactEror } from '../redux/action/contact';
import {funcFecthCarousel, funcFecthImagePanel } from './CarouselImage';
import { funcFecthRoomHome, 
        funcFecthRoomPage,
        funcFecthCountRoom,
        funFecthRoomDetail,
        funFecthRoomOrther
        } from './rooms';
import {funcFecthBlogHome, 
        funcFecthBlogRecent,
        funcFecthCountBlog,
        funcFecthBlogPage,
        funcFecthBlogDetail
        } from './blogs';


//chú ý tất cả các hàm sử lý cho blog đều put {type: type, data} -> đi thẳng vào reduces để phân tích
//      tất cả các hàm sử lý cho room đều put 1 action lấy từ trong roomAction -> action đó mới trả về {type: type, data} -> về reduces để phân tích

function* funcFecthContact({payload}){
    const args = ['contact', 'POST'];
    const {contact} = payload;
    try{
        const resp = yield call(CallApi ,...args, contact);
        
        if(resp.status === 200){
            yield put(actFecthContactSuccess());  
        }        
    }
    catch(error){
        yield put(actFecthContactEror({message: 'Error'}));
        console.log("saga contact Error");
    }
   
}
function* rootsaga(){
    yield takeLatest(types.FECTH_CAROUSEL, funcFecthCarousel);  
    yield takeLatest(types.FECTH_IMAGE_PANEL, funcFecthImagePanel); 
    yield takeLatest(types.FECTH_ROOMS_HOME, funcFecthRoomHome);
    yield takeLatest(types.FECTH_BLOGS_HOME, funcFecthBlogHome);
    yield takeLatest(types.FECTH_ROOMS_PAGE, funcFecthRoomPage);
    yield takeLatest(types.FECTH_BLOG_RECENT, funcFecthBlogRecent);
    yield takeLatest(types.FECTH_COUNT_ROOMS, funcFecthCountRoom);
    yield takeLatest(types.FECTH_COUNT_BLOGS, funcFecthCountBlog);
    yield takeLatest(types.FECTH_BLOGS_PAGE, funcFecthBlogPage);
    yield takeLatest(types.FECTH_ROOM_DETAIL, funFecthRoomDetail);
    yield takeLatest(types.FECTH_ROOM_ORTHER, funFecthRoomOrther);
    yield takeLatest(types.FECTH_BLOG_DETAIL, funcFecthBlogDetail);
    yield takeLatest(types.FECTH_CONTACT, funcFecthContact);
}

export default rootsaga;