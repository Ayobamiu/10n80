import projectReducer from './projects';
import bugReducer from './bugs';
import userReducer from './users';
import { combineReducers } from 'redux';

export default combineReducers({
    Projects: projectReducer,
    Bugs: bugReducer,
    Users: userReducer
})