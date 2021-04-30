import { useQuery, gql } from '@apollo/client';
import CardsList from 'src/components/CardsList';
import Map from 'src/components/Map';
import Spinner from 'src/components/shared/Spinner';
import { PlacesQuery } from 'src/generated/PlacesQuery';

const GET_PLACES_QUERY = gql`
  query PlacesQuery {
    places {
      _id
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

const HomePage: React.FC = () => {
  const { data, loading, error } = useQuery<PlacesQuery>(GET_PLACES_QUERY);

  if (loading && !data) {
    return <Spinner />;
  }

  /* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */

  /* 495 чтобы карточка была 480px */
  return (
    <div className="container-fluid pr-0">
      <div className="row">
        <div className="col pr-0" style={{ flex: '0 0 495px' }}>
          <CardsList places={data?.places ?? []} />
        </div>
        <div className="col">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
