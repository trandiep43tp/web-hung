import {  call, put } from 'redux-saga/effects';
import CallApi      from '../Services/ApiCaller_1';
import { actFecthCarouselsSuccess, actFecthImagePanelSuccess } from '../redux/action/carousels';

export function* funcFecthCarousel(){
    try {        
        const args = ['carousels/home', "GET", null];
        //const resp = yield call(CallApi, 'carousels/home', "GET", null);
        const resp = yield call(CallApi, ...args);
        const { data } = resp;
        yield put(actFecthCarouselsSuccess(data))
        
    }
    catch(error){
        console.log('saga loi fecth carousel')
    }
}
export function* funcFecthImagePanel(){
    const args = ['carousels/panel', "GET", null];
    try {
        const resp = yield call(CallApi, ...args);
        const { data } = resp;
        yield put(actFecthImagePanelSuccess(data))
    }
    catch(error){
        console.log("saga loi image panel")
    }
}
