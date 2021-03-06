import {
  PAYMENT_INPUT_CHANGE,
  GET_PAYMENT_PLANS_SUCCESS,
} from '../actions/types';

const initialState = {
  paymentPlans:[],
  paymentPlanId:null,
  paymentAmount:0,
  tx_ref:''
};
 
const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    
    case GET_PAYMENT_PLANS_SUCCESS:
      return {
        ...state,
        paymentPlans:action.payload     
      };  

    default:
      return state;
  }
};
export default paymentReducer;
