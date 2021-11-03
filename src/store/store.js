import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { persistenceReducer } from '../reducers/persistenceReducer';
import { toastReducer } from '../reducers/toastReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    persistence: persistenceReducer,
    toast: toastReducer,
})


const store = createStore( 
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
    );

export default store;