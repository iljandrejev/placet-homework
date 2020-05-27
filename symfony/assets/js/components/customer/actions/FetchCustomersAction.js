import {
    ACTION_STATUS_FAILED,
    ACTION_STATUS_START,
    ACTION_STATUS_SUCCESS,
    getAction
} from "../../../global/constants/action-types";
import {FETCH_CUSTOMERS_ACTION} from "../constants/ReducerConstants";
import {fetchCustomersAPI} from "../api/FetchCustomerAPI";

export function fetchCustomers(page) {
    return (dispatch) => {
        dispatch(start());
        return dispatch(fetchCustomersAPI(page))
            .then(res => dispatch(success(res.data)))
            .catch(error => dispatch(failed(error)))
    }
}

export function start() {
    return {
        type: getAction(FETCH_CUSTOMERS_ACTION, ACTION_STATUS_START)
    }
}

export function success(payload) {
    return {
        type: getAction(FETCH_CUSTOMERS_ACTION, ACTION_STATUS_SUCCESS),
        payload
    }
}

export function failed(error) {
    return {
        type: getAction(FETCH_CUSTOMERS_ACTION, ACTION_STATUS_FAILED),
        error
    }
}