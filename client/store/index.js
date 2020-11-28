import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { logger } from 'redux-logger';
import userReducer from './auth';

const reducer = combineReducers({
    user: userReducer
});

const store = createStore(reducer, applyMiddleware(logger,thunkMiddleware));

export default store;
