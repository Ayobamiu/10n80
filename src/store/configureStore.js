import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {} from 'redux';
import { createStore, applyMiddleware } from 'redux';
import projects from './projects';
import bugs from './bugs';
// import { devToolsEnhancer } from 'redux-devtools-extension'
import reducer from './reducer'
import logger from './middleware/logger'
import func from './middleware/func';
import toast from './middleware/toast';
import api from './middleware/api';

//createStore is used to configure middleware when we are not using 
// Redux toolKit. applyMiddleware is our store enhancer to enhance our store

// const store = createStore(reducer, applyMiddleware(logger));

// OR
// This
export default function () {
    return configureStore({ 
        reducer,
        middleware: [
            ...getDefaultMiddleware(),
            logger,
            toast,
            api
        ]
    });
}


