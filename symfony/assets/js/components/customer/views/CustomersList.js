import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import CustomerListItem from "./CustomerListItem";
import {fetchCustomers} from "../actions/FetchCustomersAction";
import ClientRegistrationModal from "./ClientRegistrationModal";
import Spinner from "reactstrap/es/Spinner";
import Paginator from "./Paginator";
import CustomerUpdateModal from "./CustomerUpdateModal";

class CustomersList extends Component {

    componentDidMount() {
        this.props.fetchCustomers(1);
    }

    render() {
        const {customers} = this.props;
        const customersData = customers.data;
        return (
            <React.Fragment>
                {customers.isLoaded && customers.data.items.length > 0 && <CustomerUpdateModal/>}
                <div className="row">
                    <div className="col-7">
                        <h2>Customers</h2>
                    </div>
                    <div className="col-5 text-right">
                        <ClientRegistrationModal/>
                    </div>
                </div>


                <div>
                    <table className="table table-sm table-hover table-striped">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Education</th>
                            <th>Email</th>
                            <th>Process data</th>
                            <th>Score</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {customers.isFetching && <tr><td colSpan={6} className="text-center"><Spinner type="grow" color="success" /> Loading customer...</td></tr>}
                        {customers.isLoaded && customers.data.items.length > 0 && customers.data.items.map(customer => <CustomerListItem key={customer.id} customer={customer}/>)}
                        {customers.isLoaded && customers.data.items.length === 0 && <tr><td colSpan={6} className="text-center">No customers yet</td></tr>}
                        </tbody>
                    </table>
                    {customersData &&
                    <span><strong>Total records: </strong> { customersData.totalRecords }</span>
                    }
                    <Paginator/>


                </div>



            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        customers: state.customers
    }
}

const mapDispatchToProps = (dispatch) => (bindActionCreators({
    fetchCustomers
}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(CustomersList);