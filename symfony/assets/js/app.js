import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import '../css/app.css';
import {MAIN_ROUTE} from "./global/constants/routes";
import {appStore} from "./global/configurations/app-store";
import {Provider} from "react-redux";
import GeneralLayout from "./global/layout/GeneralLayout";
import MainView from "./views/MainView";
global.jQuery = require('jquery');


class Main extends Component {
    render() {
        return(
            <Provider store={appStore}>
                <Router>
                    <Switch>
                        <RouteWrapper routeName={MAIN_ROUTE}
                                      component={MainView} layout={GeneralLayout}
                                      path="/" exact={true}   />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

function RouteWrapper({component: Component, layout: Layout, routeName:route, ...rest}) {
    return (
        <Route {...rest} render={(props) =>
            <Layout activeRoute={route} {...props}>
                <Component {...props} />
            </Layout>
        } />
    );
}



ReactDOM.render(<Main />, document.getElementById('root'));