import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import StudentregComponent from './studentreg.component.jsx';
import NavComponent from './nav/nav.component.jsx';
import config from '../../config.json';
import ListRegistrationComponent from './list.registration.component.jsx';
import HeaderComponent from '../header/header.component.jsx';

export default class ManageRregistrationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseList: []
        }
        this.courseAPI = `${config.server.url}/api/courses`;
    }
    componentWillMount() {
        axios.get(this.courseAPI)
            .then(courseListResponse => {
                const courseList = courseListResponse.data;
                if (courseList && courseList.length) {
                    this.setState({
                        courseList: courseList
                    })
                }
            })
            .catch(errorResponse => console.error(errorResponse))
    }
    render() {
        return (
            <section>
                <HeaderComponent />
                <div className="container-fluid">
                    <div className="row">
                        <Router>
                            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                                <NavComponent courseList={this.state.courseList} />
                            </nav>
                            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 pt-2">
                                <Route exact path={["/register/:courseName?", "/participants/:courseName/:participant/edit"]} component={StudentregComponent} />
                                <Route exact path="/participants/:courseName?" component={ListRegistrationComponent} />
                            </main>
                        </Router>
                    </div>
                </div>
            </section>
        )
    }
}