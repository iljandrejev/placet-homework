import {CREATE_CUSTOMER_ENDPOINT, UPDATE_CUSTOMER_ENDPOINT} from "../constants/endpoints";

export function updateCustomerAPI(id, body){
    return () => {
        return fetch(UPDATE_CUSTOMER_ENDPOINT(id), {
            method: 'PUT',
            header: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(res => {
            switch (res.status) {
                case 200:
                    return res.json();
                case 400:
                    throw Error(res.json().toString());
                default:
                    throw Error('Something went wrong');
            }
        });
    }

}