import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import actions from './actions.js';
import reducer from './reducer.js';
import sagas from './sagas.js';

let store;

const getStore = () => {

    if( !store ) {

        let sagaMiddleware = createSagaMiddleware();
        let reducers = { reducer };
        let rootReducer = combineReducers( reducers );
        let allMiddleware = applyMiddleware( sagaMiddleware );
        store = createStore( rootReducer, {}, allMiddleware );

        // see https://github.com/yelouafi/redux-saga/blob/master/examples/real-world/store/configureStore.prod.js
        store.runSaga = ( saga ) => { sagaMiddleware.run( saga ); };

        let sagaListsToRun = [
            sagas
        ];

        sagaListsToRun.forEach(
            ( sagaList ) => {
                // run each named saga exported from this saga list
                Object.keys( sagaList ).forEach(
                    ( sagaName ) => {
                        store.runSaga( sagaList[ sagaName ] );
                    }
                );
            }
        );

    }

    return store;
};

export  {
    getStore
};
