//Middleware are central to our application, applying to all  reducers

//logger: with this middleware, we want to log all 
//actions that's dispatched. kinda like DevTool

const logger = store => next=> action=> {
    /* action: the action that was dispatched
    next: reference to the next middleware function
          but, if this is the only middleware we have,
          next is going to be the reducer to to handle this 
          action*/
    
    return next(action); 
}

export default logger;
/* To use it, we have to register it as part of setting up our
store*/