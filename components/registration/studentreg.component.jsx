import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default class StudentregComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
          Student Name:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" value={this.state.value}
              onChange={this.handleChange} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
          Institute Name:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text"
              value={this.state.value}
              onChange={this.handleChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
          Mobile Number:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text"
              value={this.state.value}
              onChange={this.handleChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
          Email:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text"
                value={this.state.value}
                onChange={this.handleChange} />
          </Col>
        </Form.Group>
        <fieldset>
          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2}>
            Batch Type :
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="Week Days"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
              <Form.Check
                type="radio"
                label="Week Ends"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
              />
            </Col>
          </Form.Group>
        </fieldset>
        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
          Timmings:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text"
                value={this.state.value}
                onChange={this.handleChange} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="button" variant="primary">Save</Button>
            <Button type="button" variant="danger">Reset</Button>
          </Col>
        </Form.Group>
      </Form>
    );
  }
}
