
export const CREATE_CUSTOMER_ENDPOINT = `/api/customer`;

/**
 * @return {string}
 */
export function FETCH_CUSTOMERS_ENDPOINT(page = 1) {
    return `/api/customers?page=${page}`;
}

/**
 * @return {string}
 */
export function UPDATE_CUSTOMER_ENDPOINT(customerId) {
    return `/api/customer/${customerId}`;
}