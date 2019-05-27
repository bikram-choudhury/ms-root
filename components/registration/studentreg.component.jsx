import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import InputComponent from "../common/input.component.jsx";
import ButtonComponent from "../common/button.component.jsx";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const initialState = {
  studentName: "",
  instituteName: "",
  mobileNumber: "",
  email: "",
  batchType: "",
  sessionDuration: "",
  studentNameError: "",
  instituteNameError: "",
  mobileNumberError: "",
  emailError: "",
  sessionDurationError: "",
  batchTypeError: ""
};

export default class StudentregComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleChange(event) {
    const name = event.target.getAttribute("name");
    const state = this.state;
    state[name] = event.target.value;
    if (event.target.value != "") {
      state[name + "Error"] = "";
    }
    this.setState(state);
  }
  handleSave() {
    if (this.validate()) {
      // Do HTTP call to staore the data
      this.handleReset();
    }
  }
  handleReset() {
    this.setState({ ...initialState });
  }

  validate() {
    let studentNameError = "",
      instituteNameError = "",
      mobileNumberError = "",
      emailError = "",
      batchTypeError = "",
      sessionDurationError = "";

    if (!this.state.studentName) {
      studentNameError = "Student name cannot be blank";
    }
    if (!this.state.instituteName) {
      instituteNameError = "institute name cannot be blank";
    }
    if (!this.state.mobileNumber) {
      mobileNumberError = "mobile number cannot be blank";
    }
    if (!this.state.email.includes("@")) {
      emailError = "invalid email";
    }
    if (!this.state.batchType) {
      batchTypeError = "Please select batch Type";
    }
    if (!this.state.sessionDuration) {
      sessionDurationError = "Please add session duration";
    }
    if (
      emailError ||
      studentNameError ||
      instituteNameError ||
      mobileNumberError ||
      sessionDurationError ||
      batchTypeError
    ) {
      this.setState({
        emailError,
        studentNameError,
        instituteNameError,
        mobileNumberError,
        batchTypeError,
        sessionDurationError
      });
      return false;
    }

    return true;
  }
  render() {
    const courseName = this.props.match.params && this.props.match.params.courseName || '';
    const courseID = this.props.location.state && this.props.location.state.courseId || '';
    return (
      <Form onSubmit={this.handleSubmit}>
        <InputComponent type="hidden" value={courseID} name="hidnCrsId" readonly={true} />
        <h3 className="mb-4"><u>{courseName.toUpperCase()}</u></h3>
        <Form.Group as={Row} controlId="formHorizontalStudentName">
          <Form.Label column sm={2}>
            Student Name:
          </Form.Label>
          <Col sm={10}>
            <InputComponent
              type="text"
              value={this.state.studentName}
              placeholder="Student Name"
              onChange={this.handleChange}
              classList="form-control"
              name="studentName"
            />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.studentNameError}
            </div>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalInstituteName">
          <Form.Label column sm={2}>
            Institute Name:
          </Form.Label>
          <Col sm={10}>
            <InputComponent
              type="text"
              value={this.state.instituteName}
              placeholder="Institute Name"
              onChange={this.handleChange}
              classList="form-control"
              name="instituteName"
            />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.instituteNameError}
            </div>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalMobileNumber">
          <Form.Label column sm={2}>
            Mobile Number:
          </Form.Label>
          <Col sm={10}>
            <InputComponent
              type="tel"
              value={this.state.mobileNumber}
              placeholder="Mobile Number "
              onChange={this.handleChange}
              classList="form-control"
              name="mobileNumber"
            />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.mobileNumberError}
            </div>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email:
          </Form.Label>
          <Col sm={10}>
            <InputComponent
              type="email"
              value={this.state.email}
              placeholder="Email "
              onChange={this.handleChange}
              classList="form-control"
              name="email"
            />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.emailError}
            </div>
          </Col>
        </Form.Group>
        <fieldset>
          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2}>
              Batch Type :
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                inline
                type="radio"
                label="Week Days"
                name="batchType"
                value="weekdays"
                onChange={this.handleChange}
              />
              <Form.Check
                inline
                type="radio"
                label="Week Ends"
                name="batchType"
                value="weekends"
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.batchTypeError}
              </div>
            </Col>
          </Form.Group>
        </fieldset>
        <Form.Group as={Row} controlId="formHorizontalSessionDuration">
          <Form.Label column sm={2}>
            Session Duration:
          </Form.Label>
          <Col sm={10}>
            <InputComponent
              type="text"
              value={this.state.sessionDuration}
              placeholder="Session duration"
              onChange={this.handleChange}
              classList="form-control"
              name="sessionDuration"
            />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.sessionDurationError}
            </div>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <div className="btn-group" style={{ 'width': '100%' }}>
              <ButtonComponent
                type="button"
                classList="btn btn-success"
                value="Save"
                onClick={this.handleSave}
              />
              <ButtonComponent
                type="button"
                classList="btn btn-danger"
                value="Reset"
                onClick={this.handleReset}
              />
            </div>

          </Col>
        </Form.Group>
      </Form>
    );
  }
}
