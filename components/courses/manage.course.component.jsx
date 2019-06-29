import React, { Component } from 'react';
import CreationComponent from './creation.component.jsx';
import HeaderComponent from '../header/header.component.jsx';

export default class ManageCourseComponent extends Component {
    render() {
        return (
            <section>
                <HeaderComponent />
                <main className="flex-shrink-0">
                    <CreationComponent />
                </main>
            </section>
        )
    }
}