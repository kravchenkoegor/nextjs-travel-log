import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Coordinates } from 'src/schema/places';
import styles from './style.module.scss';

interface Props {
  place: {
    _id: string;
    userId: string;
    address: string;
    image: string;
    coordinates: Coordinates;
  };
}

const PlaceCard: React.FC<Props> = ({ place }: Props) => {
  const { _id, address, coordinates, image } = place;

  return (
    <Link href={`/places/${_id}`}>
      <Card className={styles.card}>
        <Card.Img
          variant="top"
          src={image}
          width="480"
          height={Math.floor((9 / 16) * 480)}
          style={{ width: '480px', maxWidth: '100%' }}
        />
        <Card.Body>
          <Card.Title>{address}</Card.Title>
          <Card.Text>
            Coordinates: {coordinates.latitude}, {coordinates.longitude}
          </Card.Text>
          {/* <Link href={`/places/${_id}`} prefetch={false}>
            <Button variant="primary">Go somewhere</Button>
          </Link> */}
        </Card.Body>
      </Card>
    </Link>
  );
};

export default PlaceCard;
