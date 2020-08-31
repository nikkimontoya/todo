import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TaskList from "./components/TaskList";

function App() {

    const tasks = [
        {
            title: 'Take a shower',
            body: 'Go to the shower and wash myself'
        },
        {
            title: 'Go to work',
            body: 'Go to the work and work there'
        }]
    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <TaskList tasks={tasks}/>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
