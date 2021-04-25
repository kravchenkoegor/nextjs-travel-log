import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardsList from 'src/components/CardsList';
import Map from 'src/components/Map';

const HomePage: React.FC = () => {
  /* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */

  return (
    <>
      <Container fluid className="pr-0">
        <Row>
          <Col xl>
            <CardsList />
          </Col>
          <Col xl>
            <Map />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
