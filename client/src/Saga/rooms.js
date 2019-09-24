import {  call, put } from 'redux-saga/effects';
import CallApi      from '../Services/ApiCaller_1';

// tất cả các hàm sử lý cho room đều put 1 action lấy từ trong roomAction -> action đó mới trả về {type: type, data} -> về reduces để phân tích
import { actFecthRoomsHomeSuccess, 
         actFecthRoomsPageSuccess, 
         actFecthCountRoomsSuccess, 
         actfechRoomDetailSuccess, 
         actfecthRoomOrtherSuccess 
} from '../redux/action/rooms';

export function* funcFecthRoomHome(){
    const args = ['rooms/roomhome', 'GET', null];
    try {
        const resp = yield call(CallApi, ...args);
        const { data } = resp;
        yield put(actFecthRoomsHomeSuccess(data));
    }
    catch(error){
        console.log("saga loi image panel")
    }
}

export function* funcFecthRoomPage({payload}){
    const args = ['rooms/roompage', 'GET'];
    //yield put({type: types.SHOW_LOADING}) 
    try{
        const resp = yield call(CallApi, ...args, payload);
        const { data } = resp;
        yield put(actFecthRoomsPageSuccess(data))
    }
    catch(error){       
        console.log("sa ga rooms error");
    }
}

export function* funcFecthCountRoom({payload}){
    const args = ['rooms/roomscount', 'GET'];
    try {
        const resp = yield call(CallApi, ...args, payload);
        const { data } = resp;
        yield put(actFecthCountRoomsSuccess(data))
    }
    catch(error){
        console.log("saga countroom error");
    }
}
export function* funFecthRoomDetail({payload}){
    const args = ['rooms/roomdetail', 'GET'];
    try{
        const resp = yield call(CallApi,...args, payload);
        const { data } = resp;
        yield put(actfechRoomDetailSuccess(data))
    }
    catch(error){
        console.log("saga roomđetail error ")
    }
}
export function* funFecthRoomOrther({payload}){
    const args = ['rooms/roomsorther', 'GET'];
    try{
        const resp = yield call(CallApi, ...args, payload);
        const { data }= resp;
        yield put(actfecthRoomOrtherSuccess(data))
    }
    catch(error){
        console.log(" saga roomother error")
    }
}
