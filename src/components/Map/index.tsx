import { Dispatch, memo, SetStateAction, useCallback, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { useGoogleMap } from 'src/context/MapContext';
import SearchBox from 'src/components/SearchBox';
import { Bounds, Viewport } from 'src/interfaces';

const containerStyle = {
  width: '100%',
  height: 'calc(100vh - 104px)' // 64 header, 32 marginTop, 48 footer = 142
};

interface Props {
  children: JSX.Element | JSX.Element[];
  setBounds: Dispatch<SetStateAction<Bounds>>;
  setViewport: Dispatch<SetStateAction<Viewport>>;
  viewport: Viewport;
}

// ⚠️ Make sure you cache the props passed to GoogleMap to avoid re-renders that may harm the performance.
const Map: React.FC<Props> = ({
  children,
  setBounds,
  setViewport,
  viewport
}) => {
  const { isLoaded, loadError } = useGoogleMap();

  // const { isLoaded, loadError } = useJsApiLoader({
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  //   preventGoogleFontsLoading: true,
  //   libraries: libraries as any
  // });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(map => setMap(map), []);
  const onUnmount = useCallback(() => setMap(null), []);
  const onTilesLoaded = () => {
    // console.log('onTilesLoaded');
  };

  const updateBoundsAndViewport = () => {
    if (!map) return;

    const bounds = map.getBounds() as google.maps.LatLngBounds;
    if (bounds) {
      setBounds({
        ne: {
          lat: bounds.getNorthEast().lat(),
          lng: bounds.getNorthEast().lng()
        },
        sw: {
          lat: bounds.getSouthWest().lat(),
          lng: bounds.getSouthWest().lng()
        }
      });
    }

    setViewport({
      center: {
        lat: map.getCenter().lat(),
        lng: map.getCenter().lng()
      },
      zoom: map.getZoom()
    });
  };

  const onSelectAddress = (_address: string, lat: number, lng: number) => {
    if (map) {
      map.setCenter({ lat, lng });
      updateBoundsAndViewport();
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName="map"
      mapContainerStyle={containerStyle}
      {...viewport}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onTilesLoaded={onTilesLoaded}
      onDragEnd={updateBoundsAndViewport}
      onZoomChanged={updateBoundsAndViewport}
      options={{
        disableDefaultUI: true,
        zoomControl: true
      }}
    >
      <SearchBox onSelectAddress={onSelectAddress} defaultValue="" />
      {children}
    </GoogleMap>
  ) : null;
};

export default memo(Map);
