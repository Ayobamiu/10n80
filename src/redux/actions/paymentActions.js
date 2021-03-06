import API from "../../assets/js/api";
import { returnErrors } from "./errorActions";

import {
  PAYMENT_INPUT_CHANGE,
  GET_PAYMENT_PLANS_SUCCESS,
  GET_PAYMENT_PLANS_FAILURE,
  CREATE_PAYMENT_TRANSACTION_SUCCESS,
  CREATE_PAYMENT_TRANSACTION_FAILURE,
} from "./types";

export const inputChange = (name, value) => async (dispatch) => {
  try {
    dispatch({
      type: PAYMENT_INPUT_CHANGE,
      payload: {
        name: name,
        value: value,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
export const paymentPlans = () => async (dispatch, getState) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.getPaymentPlans();
    let plan = result.data.paymentPlans;
    // if(getState().auth.user.role){
    //    plan = result.data.paymentPlans.filter(el=>el.category === getState().auth.user.role)
    // }

    dispatch({
      type: GET_PAYMENT_PLANS_SUCCESS,
      payload: plan,
    });
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_PAYMENT_PLANS_FAILURE"
      )
    );
    dispatch({
      type: GET_PAYMENT_PLANS_FAILURE,
    });
  }
};
export const createTransaction = (data) => async (dispatch, getState) => {
  try {
    await API.createPaymentTransaction(data);
    dispatch({
      type: CREATE_PAYMENT_TRANSACTION_SUCCESS,
    });
    dispatch(
      returnErrors(
        "Successfully paid",
        "200",
        "CREATE_PAYMENT_TRANSACTION_SUCCESS"
      )
    );
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_PAYMENT_PLANS_FAILURE"
      )
    );
    dispatch({
      type: CREATE_PAYMENT_TRANSACTION_FAILURE,
    });
  }
};
