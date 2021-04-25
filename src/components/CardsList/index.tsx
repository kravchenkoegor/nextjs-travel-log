import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const CardsList: React.FC = () => {
  return (
    <div
      className="cards-list"
      style={{
        overflowY: 'auto',
        height: '100%',
        maxHeight: 'calc(100vh - 136px)',
        margin: '1rem 0'
      }}
    >
      <Card style={{ width: '100%' }} className="mb-4">
        <Card.Img
          variant="top"
          src="https://via.placeholder.com/629x180.png"
          width="629"
          height="180"
        />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '100%' }} className="mb-4">
        <Card.Img
          variant="top"
          src="https://via.placeholder.com/629x180.png"
          width="629"
          height="180"
        />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '100%' }} className="mb-4">
        <Card.Img
          variant="top"
          src="https://via.placeholder.com/629x180.png"
          width="629"
          height="180"
        />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '100%' }} className="mb-4">
        <Card.Img
          variant="top"
          src="https://via.placeholder.com/629x180.png"
          width="629"
          height="180"
        />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '100%' }}>
        <Card.Img
          variant="top"
          src="https://via.placeholder.com/629x180.png"
          width="629"
          height="180"
        />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardsList;
