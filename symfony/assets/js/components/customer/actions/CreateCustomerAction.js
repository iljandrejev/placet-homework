import {createCustomerAPI} from "../api/CreateCustomerAPI";
import {
    ACTION_STATUS_FAILED,
    ACTION_STATUS_START,
    ACTION_STATUS_SUCCESS,
    getAction
} from "../../../global/constants/action-types";
import {CREATE_CUSTOMER_ACTION} from "../constants/ReducerConstants";
import {fetchCustomers} from "./FetchCustomersAction";


export function createCustomer(){
    return (dispatch, getState) => {
        dispatch(start());
        let formData = getState().createCustomerForm;
        console.log(formData);
        let body = createRequestData(formData);
        return dispatch(createCustomerAPI(body))
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
        type: getAction(CREATE_CUSTOMER_ACTION, ACTION_STATUS_START)
    }
}

export function success(payload) {
    return {
        type: getAction(CREATE_CUSTOMER_ACTION, ACTION_STATUS_SUCCESS),
        payload
    }
}

export function failed(error) {
    return {
        type: getAction(CREATE_CUSTOMER_ACTION, ACTION_STATUS_FAILED),
        error
    }
}