import React, {Component} from "react";

class GeneralLayout extends Component {
    
    render() {
        const {children} = this.props;
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
                    <a className="navbar-brand mr-auto mr-lg-0" href="#">Customers dashboard</a>

                </nav>

                <main role="main" className="container mt-4 bg-white p-4 pl-5 pr-5">
                    {children}
                </main>
            </React.Fragment>
        );
    }
}

export default GeneralLayout;