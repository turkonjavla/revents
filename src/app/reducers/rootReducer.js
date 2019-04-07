import { combineReducers } from 'redux';
import { reducer as FormReducer} from 'redux-form'
import testReducer from '../../features/testarea/testReducer';
import eventRedcuer from '../../features/event/eventReducer';

const rootReducer = combineReducers({
  test: testReducer,
  events: eventRedcuer,
  form: FormReducer
});

export default rootReducer;