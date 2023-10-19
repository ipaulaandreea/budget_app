import {Container, Col, Table, Form } from 'react-bootstrap'

const TrackingForm = () => {
    return (

        <Container>
            <h3>Add New Transaction: </h3>
            <Form>
            <Col>
              <Form.Control placeholder="Date" />
            </Col>
            <Col>
              <Form.Control placeholder="Name" />
            </Col>
            <Col>
              <Form.Control placeholder="Category" />
            </Col>
            <Col>
              <Form.Control placeholder="Amount" />
            </Col>
    
        </Form>
        
        </Container>
    )
}

export default TrackingForm;