import React, { Component } from 'react';
import HeaderComponent from './header/header.component.jsx';
import FooterComponent from './footer/footer.component.jsx';
import ManageCourseComponent from './courses/manage.course.component.jsx';
import ManageRregistrationComponent from './registration/manage.registration.component.jsx';
import './../style.scss';

export default class AppComponent extends Component {
    render() {
        return (
            <section className="d-flex flex-column h-100">
                <HeaderComponent />
                <ManageCourseComponent />
                <FooterComponent />
                <ManageRregistrationComponent />
            </section>
        )
    }
}