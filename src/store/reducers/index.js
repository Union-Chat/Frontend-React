import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const localStorage = state => state || { localStorage: null };

export default (history) => combineReducers({
  router: connectRouter(history),
  localStorage
});
