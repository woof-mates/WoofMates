import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { logger } from 'redux-logger';
import userReducer from './user';
import matchReducer from './match';
import matchesReducer from './matches';
import chatReducer from './chat';
import testimonialsReducer from './testimonials'

const reducer = combineReducers({
    user: userReducer,
    match: matchReducer,
    matches: matchesReducer,
    chat: chatReducer,
    testimonials: testimonialsReducer,
});

const store = createStore(reducer, applyMiddleware(logger,thunkMiddleware));

export default store;
