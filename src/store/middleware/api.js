import axios from 'axios';
import * as actions from '../api';

const api = ({dispatch}) => next => async action => {
    //Hardcoding 'apiRequest' and other actions when we call them is redundant,
    //we can use action creators. .. create api.js in store folder 
    if(action.type !== 'apiRequest') {
        return next(action);
    }
    
    const {url, method, data, onError, onSuccess, onStart } = action.payload;
    
    if(onStart) dispatch({type: onStart});


    next(action);
    try{
        const response = await axios.request({
            baseURL: 'http://localhost:9001/api',
            url,
            method,
            data
        });
        //when everything works well, dispatch onSuccess
        //General
        dispatch(actions.apiCallSuccess(response.data))
        //Specific
        if (onSuccess) dispatch({ type:onSuccess, payload: response.data })
    } catch(error){
        //General
        dispatch(actions.apiCallFailed(error.message))
        //Specific 
        if(onError) dispatch({ type: onError, payload: error.message })
    }
    
};

export default api;