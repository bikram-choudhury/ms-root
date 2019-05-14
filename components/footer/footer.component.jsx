import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
export default class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer mt-auto py-3 card-footer">
                <Container >
                    <span className="text-muted">Place sticky footer content here.</span>
                </Container>
            </footer>
        )
    }
}


