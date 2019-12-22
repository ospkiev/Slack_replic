import { combineReducers } from 'redux';
import user from './setUserReducer';
import channel from './setChannelReducer';
import setColorsReducer from './setColorsReducer';

const rootReducer = combineReducers({ user, channel, setColorsReducer })

export default rootReducer;