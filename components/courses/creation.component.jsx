import React, { Component } from 'react';
import InputComponent from '../common/input.component.jsx';
import ButtonComponent from '../common/button.component.jsx';
import TableComponent from '../common/table.component.jsx';

export default class CreationComponent extends Component {
    constructor(){
        super();
        this.state = {
            course: '',
            courseList: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAddCourse = this.handleAddCourse.bind(this);
        this.handleCourseDeleteAction = this.handleCourseDeleteAction.bind(this);
    }
    handleChange(event) {
        this.setState({course: event.target.value});
    }
    handleCourseDeleteAction(courseId) {
        const state = this.state;
        const courseList = state.courseList.filter(course => course.id !== courseId);
        this.setState({...state, courseList});
    }
    handleAddCourse(event) {
        if (this.state.course) {
            const courseList = this.state.courseList;
            const isExist = courseList.findIndex(course => course.courseName.toLowerCase() === this.state.course.toLowerCase())
            console.log(`isExist: ${isExist}`);
            if (isExist == -1) {
                courseList.push({
                    id: courseList.length + 1,
                    courseName: this.state.course
                })
                this.setState({courseList: courseList, course: ''});
            }
        }
    }
    handleReset = (event) => {
        this.setState({course: ''});
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
            </div>
        )
    }
}


// https://bootsnipp.com/snippets/z8aQr