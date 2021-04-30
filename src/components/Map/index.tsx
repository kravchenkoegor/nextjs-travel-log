import { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Spinner from 'src/components/shared/Spinner';

const containerStyle = {
  width: '100%',
  height: 'calc(100vh - 104px)' // 64 header, 32 marginTop, 48 footer = 142
};

interface MapCenter {
  lat: number;
  lng: number;
}

interface Props {
  center?: MapCenter;
}

const CENTER: MapCenter = {
  lat: -3.745,
  lng: -38.523
};

const ZOOM = 10;

// ⚠️ Make sure you cache the props passed to GoogleMap to avoid re-renders that may harm the performance.
const Map: React.FC<Props> = ({ center, children }) => {
  const mapCenter: MapCenter = center || CENTER;
  const zoom = center ? 13 : ZOOM;
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
      center={mapCenter}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {children}
    </GoogleMap>
  ) : (
    <Spinner />
  );
};

export default Map;
