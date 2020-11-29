import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { logger } from 'redux-logger';
import userReducer from './user';
import matchReducer from './match';

const reducer = combineReducers({
    user: userReducer,
    match: matchReducer
});

const store = createStore(reducer, applyMiddleware(logger,thunkMiddleware));

export default store;
