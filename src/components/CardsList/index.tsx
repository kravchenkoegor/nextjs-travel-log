import PlaceCard from 'src/components/PlaceCard';
import { PlacesQuery, PlacesQuery_places } from 'src/generated/PlacesQuery';

interface Props {
  places: PlacesQuery_places[];
}

const CardsList: React.FC<Props> = ({ places }) => {
  const onValueChange = (key: string, value: string) => {
    // console.log('onValueChange', { key, value });
  };

  const handleChange = (key: string) => {
    // console.log('handleChange:', key);

    return (e: MouseEvent) => {
      return onValueChange(key, `${e.target}`); // (e.target as any).value);
    };
  };

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
      {places.map(p => (
        <PlaceCard place={p} key={p._id} />
      ))}
    </div>
  );
};

export default CardsList;
