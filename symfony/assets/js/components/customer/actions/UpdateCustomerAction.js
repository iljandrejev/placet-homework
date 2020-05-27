import {createCustomerAPI} from "../api/CreateCustomerAPI";
import {fetchCustomers} from "./FetchCustomersAction";
import {
    ACTION_STATUS_FAILED,
    ACTION_STATUS_START,
    ACTION_STATUS_SUCCESS,
    getAction
} from "../../../global/constants/action-types";
import {UPDATE_CUSTOMER_ACTION} from "../constants/ReducerConstants";
import {updateCustomerAPI} from "../api/UpdateCustomerAPI";

export function updateCustomer(){
    return (dispatch, getState) => {
        dispatch(start());
        let formData = getState().editCustomerForm;
        let body = createRequestData(formData);
        return dispatch(updateCustomerAPI(formData.id, body))
            .then(response => {
                dispatch(success(response));
                dispatch(fetchCustomers());
            })
            .catch(error => dispatch(failed(error.toString())));

    }
}


function createRequestData(createCustomerForm) {
    return {
        firstname: createCustomerForm.firstname,
        lastname: createCustomerForm.lastname,
        email: createCustomerForm.email,
        education: createCustomerForm.education,
        agreement: createCustomerForm.agreement
    }
}

export function start() {
    return {
        type: getAction(UPDATE_CUSTOMER_ACTION, ACTION_STATUS_START)
    }
}

export function success(payload) {
    return {
        type: getAction(UPDATE_CUSTOMER_ACTION, ACTION_STATUS_SUCCESS),
        payload
    }
}

export function failed(error) {
    return {
        type: getAction(UPDATE_CUSTOMER_ACTION, ACTION_STATUS_FAILED),
        error
    }
}