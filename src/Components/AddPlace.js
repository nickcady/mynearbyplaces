import React from 'react';
import { Redirect } from 'react-router-dom';
import server from '../ServerInterface/server.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import  "./AddPlace.css";

class AddPlace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            category: '',
            city: '',
            state: '',
            done: false
        };
    }

    onSubmit = (event) => {
        let { name, category, city, state } = this.state;
        server.addPlace(name, category, city, state);
        event.preventDefault();
        this.setState({done: true});
    }

    onCancel = (event) => {
        event.preventDefault();
        this.setState({done: true});
    }


    onInputChange = (event) => {
        let value = event.target.value;
        let name = event.target.id;
        this.setState({[name]: value});
    }

    inputform = () => {
        return (
            <Container className='addform'>
                <Row>
                    <Col><Form>
                        <label className='title'>Add a Business</label>
                        <Form.Group controlId="name">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control size="lg" type="text" value={this.state.name}
                                onChange={this.onInputChange} placeholder="Enter Name"/>
                        </Form.Group>

                        <Form.Group controlId="category">
                            <Form.Label>Category:</Form.Label>
                            <Form.Control size="lg" type="text" value={this.state.category}
                                onChange={this.onInputChange} placeholder="Enter Category"/>
                        </Form.Group>

                        <Form.Group controlId="city">
                            <Form.Label>City:</Form.Label>
                            <Form.Control size="lg" type="text" value={this.state.city}
                                onChange={this.onInputChange} placeholder="Enter City"/>
                        </Form.Group>

                        <Form.Group controlId="state">
                            <Form.Label>State:</Form.Label>
                            <Form.Control size="lg" type="text" value={this.state.state}
                                onChange={this.onInputChange} placeholder="Enter State"/>
                        </Form.Group>
                        <Row className='buttons'>
                            <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>
                            <Button variant="primary" onClick={this.onSubmit}>Add Business</Button>
                        </Row>
                    </Form></Col>
                </Row>
            </Container>
        );
    }

    render() {
        let from = { pathname: '/mynearbyplaces'};
        if (this.state.done) {
            return (<Redirect to={from}/>);
        }
        return (
                this.inputform()
        );
    }

}

export default AddPlace;