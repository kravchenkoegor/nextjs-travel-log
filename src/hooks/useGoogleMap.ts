import { useCallback, useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places'];

export default function () {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
    preventGoogleFontsLoading: true,
    libraries: libraries as any
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(map => setMap(map), []);
  const onUnmount = useCallback(() => setMap(null), []);

  return {
    isLoaded,
    loadError,
    map,
    onLoad,
    onUnmount
  };
}
