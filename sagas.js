import { takeEvery, takeLatest, delay, call, put, fork, select, cancel, cancelled } from 'redux-saga/effects';
import { getStore } from './store.js';
import actions from './actions.js';
import constants from './constants.js';

const handleKickOff = function* ( action ) {

	console.log( 'starting delay ...' );
	yield delay( 2000 );
	yield put( actions.setValueAction( 2 ) );
	let newValue = yield select( s => s.reducer.value );
	console.log( `saga: new value ${newValue} `);
	console.log( 'middle of delay ...' );
	yield delay( 2000 );
	yield put( actions.setValueAction( 3 ) );
	newValue = yield select( s => s.reducer.value );
	console.log( `saga: new value ${newValue} `);
	console.log( 'delay finished.' );
	yield delay( 2000 );
	
};

const watchKickOffActions = function* () {
	yield takeEvery(
		constants.ACTION_TYPES.KICK_OFF,
		handleKickOff
	);
};

export default{
	mainSaga: function* () {
		yield fork( watchKickOffActions );
	}
};
