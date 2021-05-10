import { ChangeEvent } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText
} from '@reach/combobox';
import '@reach/combobox/styles.css';

interface Props {
  onSelectAddress: (address: string, lat: number, lng: number) => void;
  defaultValue: string;
}

const SearchBox: React.FC<Props> = ({ onSelectAddress, defaultValue }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions
  } = usePlacesAutocomplete({
    debounce: 300,
    defaultValue
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    // if (e.target.value === '') {
    //   onSelectAddress('', null, null);
    // }
  };

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const result = await getGeocode({ address });
      const { lat, lng } = await getLatLng(result[0]);
      onSelectAddress(address, lat, lng);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Combobox onSelect={handleSelect} className="input-block">
      <ComboboxInput
        id="search"
        value={value}
        onChange={handleChange}
        disabled={!ready}
        placeholder="Search your location"
        className="form-control w-100 shadow"
        autocomplete={false}
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === 'OK'
            ? data.map(({ place_id, description }) => (
                <ComboboxOption value={description} key={place_id} />
              ))
            : null}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default SearchBox;
