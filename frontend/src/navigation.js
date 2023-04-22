import React from 'react';
import { Container, Navbar, Button, InputGroup } from 'react-bootstrap';

export default function App() {
  return (
    <Navbar bg="light" variant="light">
      <Container fluid>
        <InputGroup tag="form" className="d-flex w-auto mb-3">
          <input className="form-control" placeholder="Type projects" aria-label="Search" type="Search" />
          <Button variant="outline-secondary">Search</Button>
        </InputGroup>
      </Container>
    </Navbar>
  );
}
