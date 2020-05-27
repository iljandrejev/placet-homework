import {CREATE_CUSTOMER_ENDPOINT} from "../constants/endpoints";

export function createCustomerAPI(body) {
    return () => {
        return fetch(CREATE_CUSTOMER_ENDPOINT, {
            method: 'POST',
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
    };

}