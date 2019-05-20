import React, { Component } from 'react';
import StudentregComponent from './studentreg.component.jsx';
import NavComponent from './nav/nav.component.jsx';

export default class ManageRregistrationComponent extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                        <NavComponent />
                    </nav>
                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 pt-5">
                        <StudentregComponent />
                    </main>
                </div>
            </div>
        )
    }
}