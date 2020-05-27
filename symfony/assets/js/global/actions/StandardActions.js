import {ACTION_STATUS_FORM_CLEAR_ERRORS, ACTION_STATUS_FORM_FIELD_CHANGE, getAction} from "../constants/action-types";

export function changeField(action, field, value) {
    return (dispatch) => dispatch({type: getAction(action, ACTION_STATUS_FORM_FIELD_CHANGE), payload: {field: field, value: value}});
}
export function clearErrors(action) {
    return (dispatch) => dispatch({type: getAction(action, ACTION_STATUS_FORM_CLEAR_ERRORS)});
}