import React from 'react';
import {  Redirect } from 'react-router-dom';
import server from '../ServerInterface/server.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './AddReview.css'

class AddReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entered: false,
            review: ''
        };
    }

    onSubmit = (place, event) => {
        let { review } = this.state;
        server.addReview(place, review);
        event.preventDefault();
        this.setState({done: true});
    }

    onCancel = (event) => {
        event.preventDefault();
        this.setState({done: true});
    }

    onInputChange = (event) => {
        let value = event.target.value;
        this.setState({review: value});
    }

    reviewForm = (place) => {
        return (
            <Container className='addform'>
                <Row>
                    <Col><Form>
                        <label>Enter a review for {place.name}</label>
                        <Form.Group controlId="review">
                        <Form.Control className='textfield' as="textarea" rows={3} value={this.state.review}
                                onChange={this.onInputChange} placeholder="Enter Review..."/>
                        </Form.Group>

                        <Row className='buttons'>
                            <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>
                            <Button variant="primary" onClick={(e) => this.onSubmit(place, e)}>Add Review</Button>
                        </Row>
                    </Form></Col>
                </Row>
            </Container>
        );
    }

    render() {
        let location = this.props.location;
        let place = false;
        if (location) {
            if (location.state) {
                if (location.state.place) {
                    place = location.state.place;
                }
            }
        }
        if (this.state.done) {
            let from = { pathname: '/mynearbyplaces'};
            return (<Redirect to={from}/>);
        }
        return (
            <Container>
                {place ? this.reviewForm(place) : ''}
            </Container>
        );
    }
}

export default AddReview;