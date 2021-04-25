import { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Spinner from 'src/components/shared/Spinner';

const containerStyle = {
  width: '100%',
  height: 'calc(100vh - 104px)' // 64 header, 32 marginTop, 48 footer = 142
};

const center = {
  lat: -3.745,
  lng: -38.523
};

// ⚠️ Make sure you cache the props passed to GoogleMap to avoid re-renders that may harm the performance.
const Map: React.FC = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
    preventGoogleFontsLoading: true
    // ...otherOptions
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function onLoadCallback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function onUnmountCallback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <Spinner />
  );
};

export default Map;
