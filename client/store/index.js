import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { logger } from 'redux-logger';
import userReducer from './user';
import matchReducer from './match';
import matchesReducer from './matches';
import testimonialsReducer from './testimonials'

const reducer = combineReducers({
    user: userReducer,
    match: matchReducer,
    matches: matchesReducer,
    testimonials: testimonialsReducer
});

const store = createStore(reducer, applyMiddleware(logger,thunkMiddleware));

export default store;
