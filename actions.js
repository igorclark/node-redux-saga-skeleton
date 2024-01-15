import constants from './constants.js';

const kickOffAction = () => {
	return { type: constants.ACTION_TYPES.KICK_OFF };
};

const setValueAction = ( value ) => {
	return { type: constants.ACTION_TYPES.SET_VALUE, value };
};

export default {
	kickOffAction,
	setValueAction
};
