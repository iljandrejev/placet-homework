import {
    ACTION_STATUS_FAILED,
    ACTION_STATUS_START,
    ACTION_STATUS_SUCCESS,
    getAction
} from "../../../global/constants/action-types";
import {FETCH_CUSTOMERS_ACTION} from "../constants/ReducerConstants";


const initialState = {
    data: [],
    isFetching: false,
    isLoaded: false,
    error: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case getAction(FETCH_CUSTOMERS_ACTION, ACTION_STATUS_START):
            return {
                ...state,
                data: [],
                isFetching: true,
                isLoaded: false,
                error: null
            };
        case getAction(FETCH_CUSTOMERS_ACTION, ACTION_STATUS_SUCCESS):
            return {
                ...state,
                data: action.payload,
                isFetching: false,
                isLoaded: true,
                error: null
            };
        case getAction(FETCH_CUSTOMERS_ACTION, ACTION_STATUS_FAILED):
            return {
                ...state,
                data: [],
                isFetching: false,
                isLoaded: true,
                error: action.error
            };
        default:
            return state;
    }
}