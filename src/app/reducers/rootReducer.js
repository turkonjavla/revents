import { combineReducers } from 'redux';
import testReducer from '../../features/testarea/testReducer';
import eventRedcuer from '../../features/event/eventReducer';

const rootReducer = combineReducers({
  test: testReducer,
  events: eventRedcuer
});

export default rootReducer;