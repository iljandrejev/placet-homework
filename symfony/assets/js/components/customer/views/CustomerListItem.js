import React, {Component} from "react";
import Button from "reactstrap/es/Button";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changeField, clearErrors} from "../../../global/actions/StandardActions";
import {cancelEditCustomer, editCustomer} from "../actions/EditCustomerAction";

class CustomerListItem extends Component {

    render() {
        const {customer} = this.props;
        return (
            <React.Fragment>
                <tr>
                    <td>{ `${customer.firstname} ${customer.lastname}`}</td>
                    <td>{ customer.education }</td>
                    <td>{customer.email}</td>
                    <td>{customer.agreement ? <span className="label label-success"> Agreed </span> : <span className="label label-danger">Not agreed</span> }</td>
                    <td>{customer.score}</td>
                    <td><Button size="sm" outline color="primary" onClick={() => {this.props.editCustomer(customer)}}>edit</Button></td>
                </tr>
            </React.Fragment>
        );
    }
}
function mapStateToProps(state) {
    return {
    }
}

const mapDispatchToProps = (dispatch) => (bindActionCreators({
    editCustomer
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(CustomerListItem);