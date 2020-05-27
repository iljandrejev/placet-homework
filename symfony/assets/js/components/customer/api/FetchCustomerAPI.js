import {FETCH_CUSTOMERS_ENDPOINT} from "../constants/endpoints";

export function fetchCustomersAPI(page) {
    return () => {
        return fetch(FETCH_CUSTOMERS_ENDPOINT(page), {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            switch (res.status) {
                case 200:
                    return res.json();
                default:
                    throw Error("Something went wrong");
            }
        })
    }
}