import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import registerReducer from './modules/auth/reducers/reducers.js';
import { composeWithDevTools } from 'redux-devtools-extension';


const middleWare = [thunk];

const reducers = combineReducers({register: registerReducer});

const store = createStore(reducers , composeWithDevTools(applyMiddleware(...middleWare)));

export {store};