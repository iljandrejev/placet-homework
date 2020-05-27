import {ACTION_STATUS_RESET, ACTION_STATUS_START, getAction} from "../../../global/constants/action-types";
import {EDIT_CUSTOMER_ACTION} from "../constants/ReducerConstants";

export function editCustomer(customer) {
    return (dispatch) => {
        return(dispatch(start(customer)))
    }
}

export function cancelEditCustomer(){
    return (dispatch) => {
        return(dispatch(stop()))
    }
}

export function start(customer) {
    return {
        type: getAction(EDIT_CUSTOMER_ACTION, ACTION_STATUS_START),
        customer
    }
}

export function stop() {
    return {
        type: getAction(EDIT_CUSTOMER_ACTION, ACTION_STATUS_RESET)
    }

}