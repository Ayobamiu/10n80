//This middleware function returns a Toastify error whenever we dispatch 
// a function of the type error.

const toast = store => next => action => {
    if (action.type === 'error')
        console.log("Toastify ", action.payload.message);
        
    else
        return next(action)
}

export default toast;