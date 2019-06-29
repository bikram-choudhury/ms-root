import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import FooterComponent from './footer/footer.component.jsx';
import ManageCourseComponent from './courses/manage.course.component.jsx';
import ManageRregistrationComponent from './registration/manage.registration.component.jsx';
import AuthenticationComponent from './authentication/authentication.component.jsx';
import './../style.scss';

export default class AppComponent extends Component {
    render() {
        return (
            <section className="d-flex flex-column h-100">
                <Router>
                    <Route exact path="/" component={AuthenticationComponent} />
                    <Route path="/course" component={ManageCourseComponent} />
                    <Route path="/register" component={ManageRregistrationComponent} />
                    <Route path="/participants" component={ManageRregistrationComponent} />
                    <FooterComponent />
                </Router>
            </section>
        )
    }
}