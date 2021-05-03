import PlaceCard from 'src/components/PlaceCard';
import { PlacesQuery_places } from 'src/generated/PlacesQuery';

interface Props {
  places: PlacesQuery_places[];
}

const CardsList: React.FC<Props> = ({ places }) => {
  return !places.length ? (
    <p>No items found</p>
  ) : (
    <div
      className="cards-list"
      style={{
        overflowY: 'auto',
        height: '100%',
        maxHeight: 'calc(100vh - 136px)',
        margin: '1rem 0'
      }}
    >
      {places.map(p => (
        <PlaceCard place={p} key={p._id} />
      ))}
    </div>
  );
};

export default CardsList;
