import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import { Marker } from '@react-google-maps/api';
import { useAuth } from 'src/auth/useAuth';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Map from 'src/components/Map';
import Spinner from 'src/components/shared/Spinner';
import { GetPlace, GetPlaceVariables } from 'src/generated/GetPlace';

const GET_PLACE_QUERY = gql`
  query GetPlace($id: String!) {
    place(id: $id) {
      address
      coordinates {
        latitude
        longitude
      }
      image
      userId
    }
  }
`;

const Panel: React.FC = () => {
  return (
    <div className="py-4">
      <Button variant="primary" className="mr-3">
        Edit
      </Button>
      <Button variant="danger">Delete</Button>
    </div>
  );
};

const Place: React.FC = () => {
  const {
    query: { title }
  } = useRouter();
  const { user } = useAuth();

  const { data, loading, error } = useQuery<GetPlace, GetPlaceVariables>(
    GET_PLACE_QUERY,
    {
      variables: {
        id: (title as string) ?? ''
      }
    }
  );

  if (loading && !data) {
    return <Spinner />;
  }

  if (!data?.place) {
    return <p style={{ color: 'red' }}>No place found!</p>;
  }

  const { place } = data;
  const { address, coordinates, image, userId } = place;
  const center = {
    lat: coordinates.latitude,
    lng: coordinates.longitude
  };
  const canManage = !!user && user.uid === userId;

  return (
    <div className="container-fluid pr-0">
      <div className="row">
        <div className="col pr-0" style={{ flex: '0 0 495px' }}>
          {canManage ? (
            <Panel />
          ) : (
            <div className="mt-4">
              <Link href="/">
                <Button variant="link">Back to list</Button>
              </Link>
            </div>
          )}
          <p className="text-white my-4">{address}</p>
          <img src={image} className="img-fluid" />
        </div>
        <div className="col">
          <Map center={center}>
            <Marker position={center}></Marker>
          </Map>
        </div>
      </div>
    </div>
  );
};

export default Place;
