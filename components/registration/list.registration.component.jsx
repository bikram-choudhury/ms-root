import React, { Component } from "react";
import axios from "axios";
import config from "../../config.json";
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

export default class ListRegistrationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participants: []
        }
        this.courseID = '';
        this.courseName = '';
        this.enrollAPI = `${config.server.url}/api/enroll-candidate`;
    }
    componentWillMount() {
        const courseID = this.props.location.state && this.props.location.state.courseId || '';
        if (courseID) {
            axios.get(`${this.enrollAPI}/${courseID}`)
                .then(candiateListResponse => {
                    const participants = candiateListResponse.data;
                    if (participants && participants.length) {
                        this.setState({
                            participants: participants
                        })
                    }
                })
                .catch(errorResponse => console.error(errorResponse))
        }
    }
    handleEdit = (participantDetails) => {
        if (!(participantDetails && participantDetails._id)) {
            return false;
        }
        
        this.props.history.push({
            pathname: `/participants/${this.courseName}/${participantDetails._id}/edit`,
            state: {
                courseId: this.courseID,
                participantDetails
            }
        })
    }
    handleDelete = (participantId) => {
        if (!participantId) {
            return false;
        }
        axios.delete(`${this.enrollAPI}/${participantId}`)
        .then(deleteResponse => {
            const response = deleteResponse.data;
            if (response && response.status) {
                const participants = this.state.participants.filter((candidate) => candidate._id != participantId)
                this.setState({participants: participants});
            }
        })
        .catch(errorResponse => console.error(errorResponse))
    }
    changeStatus = (participantId, status) => {
        if (!participantId) {
            return false;
        }
        axios.put(`${this.enrollAPI}/${participantId}`, {courseId: this.courseID, status})
        .then(successResponse => {
            const participants = this.state.participants.map((partipant) => {
                if (partipant._id === participantId) {
                    partipant.status = successResponse.data.status
                }
                return partipant;
            })
            this.setState({participants})
        })
        .catch(errorResponse => console.log(successResponse))
    }
    render() {
        this.courseName =
            (this.props.match.params && this.props.match.params.courseName) || "";
        this.courseID =
            (this.props.location.state && this.props.location.state.courseId) || "";
        return (
            <section>
                <h3>
                    <u>Participants at {this.courseName.toUpperCase()}</u>
                </h3>
                <div className="table-responsive">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className="nowrap">#</th>
                                <th className="nowrap">Name</th>
                                <th className="nowrap">Email</th>
                                <th className="nowrap">Contact</th>
                                <th className="nowrap">Institute name</th>
                                <th className="nowrap">Batch Type</th>
                                <th className="nowrap">Session Timmings</th>
                                <th className="nowrap">Status</th>
                                <th className="nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.participants.map((participant, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="nowrap">{index + 1}</td>
                                            <td className="nowrap">{participant.candidateName}</td>
                                            <td className="nowrap">{participant.email}</td>
                                            <td className="nowrap">{participant.contact}</td>
                                            <td className="nowrap">{participant.instituteName}</td>
                                            <td className="nowrap">{participant.batchType}</td>
                                            <td className="nowrap">{participant.sessionTimings}</td>
                                            <td className="nowrap">{participant.status}</td>
                                            <td className="nowrap">
                                                <ButtonGroup aria-label="Toolbar with button groups">
                                                    <Button variant="primary" className="mr-1" onClick={() => this.handleEdit(participant)}>
                                                        <i className="fas fa-edit"></i>
                                                    </Button>
                                                    <Button variant="danger" className="mr-1" onClick={() => this.handleDelete(participant._id)}>
                                                        <i className="fas fa-trash-alt"></i>
                                                    </Button>
                                                    {
                                                        participant.status === 'completed'? (
                                                            <Button variant="warning" onClick={() => this.changeStatus(participant._id, 'running')}>
                                                                <i className="fas fa-history"></i>
                                                            </Button>
                                                        ): (
                                                            <Button variant="success" onClick={() => this.changeStatus(participant._id, 'completed')}>
                                                                <i className="fas fa-check-circle"></i>
                                                            </Button>
                                                        )
                                                    }
                                                    

                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </Table>
                </div>
            </section>
        )
    }
}