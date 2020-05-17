import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import logger from 'redux-logger';
import reducers from './reducers.js';

const appReducers = combineReducers(reducers);

const middlewares = [thunkMiddleware];

if(process.env.NODE_ENV === "development") {
    middlewares.push(logger);
}

export const store = createStore(appReducers , composeWithDevTools(applyMiddleware(...middlewares)));