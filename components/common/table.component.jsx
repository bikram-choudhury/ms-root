import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseNavListHeader: ['ID', 'Course Name', 'Action']
        }
    }
    render() {
        return (
            <Table striped bordered hover>
                <TheadComponent headers={this.state.courseNavListHeader} />
                <TBodyComponent courseNavList={this.props.courseNavList} courseDeleteAction={this.props.courseDeleteAction}/>
            </Table>
        )
    }
}

class TheadComponent extends Component {
    render() {
        return (
            <thead>
                <tr>
                    {
                        this.props.headers
                        .map(
                            (header, index) => <th key={index}>{header}</th>
                        )
                    }
                </tr>
            </thead>
        )
    }
}

class TBodyComponent extends Component {
    render() {
        return (
            <tbody>
                {
                    this.props.courseNavList
                    .map(
                        (course, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{course.name}</td>
                                    <td>
                                    <Button variant="outline-danger" onClick={() => this.props.courseDeleteAction(course._id)}>Remove</Button>
                                    </td>
                                </tr>
                            )
                        }
                    )
                }
                
            </tbody>
        )
    }
}