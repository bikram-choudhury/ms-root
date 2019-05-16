import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import InputComponent from '../common/input.component.jsx';
import ButtonComponent from '../common/button.component.jsx';

export default class CreationComponent extends Component {
    constructor(){
        super();
        this.state = {
            course: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAddCourse = this.handleAddCourse.bind(this);
    }
    handleChange(event) {
        this.setState({course: event.target.value});
    }
    handleAddCourse(event) {
        console.log(`Course Name: ${this.state.course}`);
    }
    /*handleReset = (event) => {
        this.setState({course: ''});
    }*/
    render() {
        return (
            <div className="container course-container">
                <div className="row">
                    <div className="col-md-6 form-bg-primary">
                        <h3>Add Course </h3>
                        <form>
                            <div className="form-group">
                                <InputComponent type="text" classList="form-control" placeholder="Course Name *" value={this.state.course} onChange={this.handleChange} />
                            </div>
                            
                            <div className="form-group">
                                <ButtonComponent type="button" classList="btnSubmit" value="Add" onClick={this.handleAddCourse} />
                                <ButtonComponent type="button" classList="btnSubmit" value="Reset" onClick={this.handleReset} />
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6 form-bg-light">
                        <h3>Course Nav List</h3>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td colSpan="2">Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}


// https://bootsnipp.com/snippets/z8aQr