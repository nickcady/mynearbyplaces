import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import server from '../ServerInterface/server.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './Home.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            results: [],
            searchType: 'city',
            searchTerm: '',
            entered: false,
            review: false,
            place: ''
        };
    }

    searchSubmit = (event) => {
        let { data, searchType, searchTerm } = this.state;
        let results = [];
        data.forEach(place => {
            if (searchType === 'city') {
                if (place.city === searchTerm) {
                    results.push(place);
                }
            } else if (searchType === 'name') {
                if (place.name === searchTerm) {
                    results.push(place);
                }
            }
        });
        this.setState({ results: results, entered: true });
    }

    onOptionChange = (event) => {
        let val = event.target.value;
        this.setState({ searchType: val });
        event.preventDefault();
    }

    onSearchChange = (event) => {
        let val = event.target.value;
        this.setState({ searchTerm: val });
        event.preventDefault();
    }

    removeEntry = (p, e) => {
        this.state.results.slice(this.state.results.indexOf(p), 1);
        server.removePlace(p);
        this.searchSubmit();
        console.log(this.state.data);
    }

    addReview = (p, e) => {
        this.setState({review: true, place: p});
    }

    body = () => {
        return (
            <Container className='search'>
                <Row>
                    <Form.Group>
                        <Form.Control as="select" size="lg" value={this.state.selector} onChange={this.onOptionChange}>
                            <option value='city'>City</option>
                            <option value='name'>Name</option>
                        </Form.Control>
                        <Form.Control type="text" placeholder="search..." value={this.state.searchTerm}
                            onChange={this.onSearchChange} />
                        <Button as='input' type='submit' value='Submit' onClick={this.searchSubmit} />
                    </Form.Group>
                </Row>
            </Container>
        );
    }

    renderResults = () => {
        let { results } = this.state;
        return (
            <Container className='result'>
                <Col>
                    {results.length > 0 ?
                        <Container>
                            {results.map((p, i) =>
                                <Container key={i} className='resultbox'>
                                    <label>{(i + 1) + ': ' + p.name}</label>
                                    <br />
                                    <label>{p.city + ", " + p.state}</label>
                                    <br />
                                    <label>{p.category}</label>
                                    <br />
                                    {p.reviews.length > 0 ?
                                        <Container>
                                            <label>Reviews:</label>
                                            <br />
                                            <Container>
                                                {p.reviews.map((r, x) =>
                                                    <Container className='reviews' key={x}>
                                                        <label>{'    "' + r + '"'}</label>
                                                        <br />
                                                    </Container>
                                                )}
                                            </Container>
                                        </Container>
                                        : ''}
                                    <Row className='buttons'>
                                        <Button variant='danger' onClick={(e) => this.removeEntry(p, e)}>Remove</Button>
                                        <Button variant='primary' onClick={(e) => this.addReview(p, e)}>Add Review</Button>
                                    </Row>
                                </Container>
                            )}
                        </Container>
                        : 'Sorry, no results for that search'}
                </Col>
            </Container>
        );
    }

    componentDidMount() {
        let data = server.getPlaces();
        this.setState({ data: data });

    }

    render() {
        let { review, place } = this.state;
        if (review) {
            return (<Redirect to={{pathname: "/addreview", state: {place: place}}} />);
        }
        return (
            <Container>
                <Container className="addplace">
                    <Link to="/addplace">Add Company</Link>
                </Container>
                <Container className='welcome'>
                    <Container className='near'>Welcome to mynearbyplaces!</Container>
                    {this.body()}
                    {this.state.entered ? this.renderResults() : ''}
                </Container>
            </Container>
        )
    }

}

export default Home;