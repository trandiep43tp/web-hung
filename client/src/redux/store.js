import { createStore, applyMiddleware, compose }  from 'redux';
import myReduce         from  './reduces/index';
import thunk            from 'redux-thunk';  //đây là 1 middleware
import createSagaMiddleware from 'redux-saga';
import rootsaga             from '../Saga';


const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({shouldhotReload: false }) : compose;
// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware =[thunk, sagaMiddleware ];  
const enhancers  = [applyMiddleware(...middleware)];  
const store = createStore(myReduce, composeEnhancers(...enhancers));
sagaMiddleware.run(rootsaga);

export default store;   