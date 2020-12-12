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
            reviews: [],
            results: [],
            searchType: 'city',
            searchTerm: '',
            entered: false,
            review: false,
            place: ''
        };
    }

    searchSubmit = (event) => {
        let { searchType, searchTerm } = this.state;
        server.search(searchType, searchTerm).then(results => {
            for (let i = 0; i < results.length; i++) {
                server.getReviews(results[i].id).then(y => results[i].reviews = y);
            }
            this.setState({ results: results, entered: true })
        })
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
        console.log(p.reviews);
    }

    addReview = (p, e) => {
        this.setState({ review: true, place: p });
    }

    body = () => {
        return (
            <Container className='search'>
                <Row>
                    <Form.Group>
                        <Form.Control as="select" size="lg" value={this.state.selector} onChange={this.onOptionChange}>
                            <option value='city'>City</option>
                            <option value='state'>State</option>
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
        // for (let i = 0; i < results.length; i++) {
        //     console.log(results[i]);
        // }
        // console.log(results);
        return (
            <Container className='result'>
                <Col>
                    {results.length > 0 ?
                        <Container>
                            {results.map((p, i) =>
                                <Container key={i} className='resultbox'>
                                    <label>{(i + 1) + ': ' + p.place}</label>
                                    <br />
                                    <label>{p.city + ", " + p.state}</label>
                                    <br />
                                    <label>{p.category}</label>
                                    <br />
                                    {(p.reviews !== undefined && p.reviews.length > 0) ?
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

    render() {
        let { review, place } = this.state;
        if (review) {
            return (<Redirect to={{ pathname: "/addreview", state: { place: place } }} />);
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