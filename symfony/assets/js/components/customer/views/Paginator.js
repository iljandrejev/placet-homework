import React, {Component} from "react";
import Pagination from "reactstrap/es/Pagination";
import {connect} from "react-redux";
import PaginationItem from "reactstrap/es/PaginationItem";
import PaginationLink from "reactstrap/es/PaginationLink";
import {bindActionCreators} from "redux";
import {fetchCustomers} from "../actions/FetchCustomersAction";

class Paginator extends Component {

    constructor(props) {
        super(props);

        this.pages = this.pages.bind(this);
        this.showPage = this.showPage.bind(this);
    }

    pages() {
        const {customers} = this.props;
        const {totalPages} = customers.data;
        let pages = [];
        for(let i = 1; i <= totalPages; i++){
            pages.push(i);
        }
        return pages;
    }

    showPage(pageNr) {
        const {data} = this.props.customers;
        const {pageNumber} = data;
        if(pageNr === pageNumber) return;
        this.props.fetchCustomers(pageNr);
    }




    render() {
        const {data} = this.props.customers;
        const {pageNumber} = data;

        return (
            <React.Fragment>
            <Pagination aria-label="Page navigation example">
                {this.pages().map((page) =>  <PaginationItem key={page.toString()} active={page === pageNumber}>
                    <PaginationLink onClick={() => {this.showPage(page)}}>
                        {page}
                    </PaginationLink>
                </PaginationItem>)}
            </Pagination>
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
export default connect(mapStateToProps, mapDispatchToProps)(Paginator);