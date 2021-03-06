import entitiesReducer from './entities';
import { combineReducers } from 'redux';

export default combineReducers({
    Entities: entitiesReducer,
    
})