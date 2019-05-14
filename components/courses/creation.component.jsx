import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

export default class CreationComponent extends Component {
    render() {
        return (
            <div className="container course-container">
                <div className="row">
                    <div className="col-md-6 form-bg-primary">
                        <h3>Add Course </h3>
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Course Name *" defaultValue="" />
                            </div>
                            
                            <div className="form-group">
                                <input type="submit" className="btnSubmit" value="Add" />
                                <input type="button" className="btnSubmit" value="Reset" />
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