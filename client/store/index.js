import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { logger } from 'redux-logger';

const reducer = combineReducers({
});

const store = createStore(reducer, applyMiddleware(logger,thunkMiddleware));

export default store;
