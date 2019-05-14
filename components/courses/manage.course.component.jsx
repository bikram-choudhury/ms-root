import React, { Component } from 'react';
import CreationComponent from './creation.component.jsx';

export default class ManageCourseComponent extends Component {
    render() {
        return (
            <main className="flex-shrink-0">
                <CreationComponent />
            </main>
        )
    }
}