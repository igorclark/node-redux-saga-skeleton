import sizeof           from 'object-sizeof';

import { handleActions }    from 'redux-actions';

const initStateObject = ( roomNames, createFunction, objectLabel, logger ) => {

    let obj = {};

    let start = Date.now();

    roomNames.forEach(
        ( name ) => {
            obj[ name ] = createFunction();
        }
    );

    let finish = Date.now();

    let millis  = finish - start;
    let seconds = millis / 1000;

    let sizeofBytesUsed     = sizeof( obj );
    let sizeofKbytesUsed    = Math.round( sizeofBytesUsed / 1024 );
    let sizeofMbytesUsed    = sizeofBytesUsed / 1024 / 1024;

    logger.trace(
        `initialised ${Object.keys( obj ).length} ${objectLabel} `
        + `using ~${sizeofKbytesUsed}KiB `
        + `(${sizeofMbytesUsed.toFixed( 2 )}MiB) `
        + `in ${seconds} seconds`
    );

    return obj;

};

// redux-ignore higher order reducer
// adapted from https://github.com/omnidan/redux-ignore
const filterActions = ( () => {

    return function ( reducer ) {

        var actions = arguments.length <= 1 || arguments[ 1 ] === undefined ? [] : arguments[ 1 ];

        var isInList = ( action ) => {
            return actions.indexOf( action.type ) >= 0;
        };

        var initialState = reducer( undefined, {} );

        return function () {

            var state = arguments.length <= 0 || arguments[ 0 ] === undefined ? initialState : arguments[ 0 ];
            var action = arguments[ 1 ];

            if ( !isInList( action ) ) {
                return state;
            }

            return  reducer( state, action );
        };
    };
})();

const createFilteredActionHandler = ( actionHandlers, initialState ) => {

    let actionHandlerNames = Object.keys( actionHandlers );

    const actionHandler = filterActions(
        handleActions( actionHandlers, initialState ),
        actionHandlerNames
    );

    return actionHandler;
}

export {
    initStateObject,
    filterActions,
    createFilteredActionHandler
};

