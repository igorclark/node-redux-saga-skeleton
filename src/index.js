import { getStore } from './store.js';
import actions from  './actions.js';

const store = getStore();

store.dispatch( actions.setValueAction( 1 ) );
store.dispatch( actions.kickOffAction() );
