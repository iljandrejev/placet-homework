import {
    ACTION_STATUS_FAILED,
    ACTION_STATUS_FORM_CLEAR_ERRORS,
    ACTION_STATUS_FORM_FIELD_CHANGE, ACTION_STATUS_RESET, ACTION_STATUS_START, ACTION_STATUS_SUCCESS,
    getAction
} from "../../../global/constants/action-types";
import {CREATE_CUSTOMER_ACTION, EDIT_CUSTOMER_ACTION, UPDATE_CUSTOMER_ACTION} from "../constants/ReducerConstants";


const initialState = {
    isFetching: false,
    isEditing: false,
    error: null,
    id: null,
    firstname: '',
    firstnameError: null,
    lastname: '',
    lastnameError: null,
    email: '',
    emailError: null,
    education: '',
    educationError: null,
    agreement: false,
    agreementError: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case getAction(EDIT_CUSTOMER_ACTION, ACTION_STATUS_FORM_FIELD_CHANGE):
            return {
                ...state,
                [action.payload.field]: action.payload.value,
            };
        case getAction(EDIT_CUSTOMER_ACTION, ACTION_STATUS_FORM_CLEAR_ERRORS):
            return {
                ...state,
                error: null,
                firstnameError: null,
                lastnameError: null,
                emailError: null,
                educationError: null,
            };
        case getAction(EDIT_CUSTOMER_ACTION, ACTION_STATUS_START):
            
            return {
                ...state,
                error: null,
                isEditing: true,
                id: action.customer.id,
                firstname: action.customer.firstname,
                lastname: action.customer.lastname,
                education: action.customer.education,
                email:action.customer.email,
                agreement: action.customer.agreement
            };
        case getAction(UPDATE_CUSTOMER_ACTION, ACTION_STATUS_SUCCESS):
        case getAction(EDIT_CUSTOMER_ACTION, ACTION_STATUS_RESET):
            return initialState;
        case getAction(UPDATE_CUSTOMER_ACTION, ACTION_STATUS_START):
            return {
              ...state,
              isFetching: true,
              error:null
            };
        case getAction(UPDATE_CUSTOMER_ACTION, ACTION_STATUS_FAILED):
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        default:
            return state;


    }
}