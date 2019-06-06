import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import registerReducer from './modules/auth/reducers/reducers.js';
import newsReducer from './modules/news/reducers/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';


const middleWare = [thunk];

const reducers = combineReducers({register: registerReducer, news: newsReducer});

const store = createStore(reducers , composeWithDevTools(applyMiddleware(...middleWare)));

export {store};