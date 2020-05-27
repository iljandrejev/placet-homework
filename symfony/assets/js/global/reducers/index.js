import {combineReducers } from 'redux';
import customerReducers from '../../components/customer/reducers';

export default combineReducers({
    ...customerReducers
});