import React, {Component, useState} from "react";
import CustomersList from "../components/customer/views/CustomersList";


class MainView extends Component {



    render() {

        return (
            <React.Fragment>
                <CustomersList/>
            </React.Fragment>
        );
    }
}

export default MainView;