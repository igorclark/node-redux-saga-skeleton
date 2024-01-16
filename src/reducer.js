import constants from './constants.js';
import { createFilteredActionHandler } from './reducer-utils.js';

const initialState = {
	value: null
};

const setValue = ( state, action ) => {
	const newState = JSON.parse( JSON.stringify( state ) );
	newState.value = action.value;
	console.log( `setting new state: `, newState );
	return newState;
};

const actionHandlers = {
	[ constants.ACTION_TYPES.SET_VALUE ]: setValue
};

const actionHandler = createFilteredActionHandler( actionHandlers, initialState );

export default actionHandler;
