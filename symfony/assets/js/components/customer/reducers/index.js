import customersReducer from './CustomerReducer';
import createCustomerFormReducer from './CreateCustomerFormReducer';
import editCustomerFormReducer from './EditCustomerFormReducer';

export default {
    customers: customersReducer,
    createCustomerForm: createCustomerFormReducer,
    editCustomerForm: editCustomerFormReducer
};