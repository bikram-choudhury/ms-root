import React, { Component } from 'react';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import InputComponent from '../common/input.component.jsx';
import ButtonComponent from '../common/button.component.jsx';
import TableComponent from '../common/table.component.jsx';
import config from '../../config.json';

export default class CreationComponent extends Component {
    constructor(){
        super();
        this.state = {
            course: '',
            alert: null,
            courseList: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAddCourse = this.handleAddCourse.bind(this);
        this.handleCourseDeleteAction = this.handleCourseDeleteAction.bind(this);
        this.fetchAllCourseList = this.fetchAllCourseList.bind(this);
        this.courseAPI = `${config.server.url}/api/courses`;

        this.fetchAllCourseList();
    }
    fetchAllCourseList() {
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
    handleChange(event) {
        this.setState({course: event.target.value});
    }
    handleCourseDeleteAction(courseId) {
        const deleteApi = `${this.courseAPI}/${courseId}`;
        axios.delete(deleteApi)
        .then(deleteResponse => {
            console.log(deleteResponse);
            const action = deleteResponse.data.action;
            if (action == "DELETED") {
                const state = this.state;
                const courseList = state.courseList.filter(course => course._id !== courseId);
                this.setState({...state, courseList});
                this.showAlert('success', 'Course deleted successfully!');
            }
        })
        .catch(errorResponse => console.error(errorResponse))
        
    }
    handleAddCourse(event) {
        const courseName = this.state.course;
        if (courseName) {
            const courseList = this.state.courseList;
            const isExist = courseList.findIndex(course => course.name.toLowerCase() === courseName.toLowerCase())
            console.log(`isExist: ${isExist}`);
            if (isExist == -1) {
                axios.post(this.courseAPI, {
                    name: courseName
                }).then(createResponse => {
                    const courseDetail = createResponse.data;
                    courseList.push({
                        id: courseDetail._id,
                        name: courseDetail.name
                    })
                    this.setState({courseList: courseList, course: ''});
                    this.showAlert('success', 'Course name added!');
                })
                .catch(errorResponse => console.error(errorResponse))
            } else {
                this.showAlert('error', 'Course name is already exist!');
            }
        } else {
            this.showAlert('error', 'Course name should not be empty!');
        }
    }
    
    handleReset = (event) => {
        this.setState({course: ''});
    }
    showAlert(type, message) {
        const alert = (<SweetAlert type={type} title={message} onConfirm={this.hideAlert} />);
        this.setState({alert: alert})
    }
    hideAlert = () => {
        this.setState({alert: null})
    }
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
                    {
                        this.state.courseList.length ? (
                            <div className="col-md-6 form-bg-light">
                                <h3>Course Nav List</h3>
                                <TableComponent courseNavList={this.state.courseList} courseDeleteAction={this.handleCourseDeleteAction} />
                            </div>
                        ): ''
                    }
                    
                </div>
                {this.state.alert}
            </div>
        )
    }
}


// https://bootsnipp.com/snippets/z8aQr