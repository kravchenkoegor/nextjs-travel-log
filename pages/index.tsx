import { useQuery, gql } from '@apollo/client';
import { useDebounce } from 'use-debounce';
import { useLastData } from 'src/hooks/useLastData';
import { useLocalState } from 'src/hooks/useLocalState';
import { Marker } from '@react-google-maps/api';
import CardsList from 'src/components/CardsList';
import Map from 'src/components/Map';
import { Bounds, Viewport } from 'src/interfaces';
import { PlacesQuery, PlacesQueryVariables } from 'src/generated/PlacesQuery';

const GET_PLACES_QUERY = gql`
  query PlacesQuery($bounds: BoundsInput!) {
    places(bounds: $bounds) {
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

const initialBounds: Bounds = {
  ne: {
    lat: 57.18678735974653,
    lng: 61.22407928909558
  },
  sw: {
    lat: 56.44228588909791,
    lng: 60.11020297984975
  }
};

const HomePage: React.FC = () => {
  const [bounds, setBounds] = useLocalState<Bounds>('bounds', initialBounds);
  const [debounceBounds] = useDebounce(bounds, 300);

  const { data, loading, error } = useQuery<PlacesQuery, PlacesQueryVariables>(
    GET_PLACES_QUERY,
    {
      variables: { bounds: debounceBounds }
    }
  );

  const lastData = useLastData(data);
  const places = lastData?.places ?? [];

  const [viewport, setViewport] = useLocalState<Viewport>('viewport', {
    center: {
      lat: 56.79571,
      lng: 60.5157358
    },
    zoom: 10
  });

  /* 495 чтобы карточка была 480px */
  return (
    <div className="container-fluid pr-0">
      <div className="row">
        <div className="col pr-0" style={{ flex: '0 0 495px' }}>
          {loading && !lastData ? (
            <p style={{ color: 'lime' }}>Loading...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>Error: {JSON.stringify(error)}</p>
          ) : (
            <CardsList places={places} />
          )}
        </div>
        <div className="col">
          <Map
            setBounds={setBounds}
            setViewport={setViewport}
            viewport={viewport}
          >
            {places.map(({ _id, coordinates: c }) => (
              <Marker
                key={_id}
                position={{ lat: c.latitude, lng: c.longitude }}
              ></Marker>
            ))}
          </Map>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
