import { createContext, useContext } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

interface IMapContext {
  isLoaded: boolean;
  loadError: Error | undefined;
}

const MapContext = createContext<IMapContext>({
  isLoaded: false,
  loadError: undefined
});

const libraries = ['places'];

export const MapProvider: React.FC = ({ children }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
    preventGoogleFontsLoading: true,
    libraries: libraries as any
  });

  const providerValue = {
    isLoaded,
    loadError
  };

  return (
    <MapContext.Provider value={providerValue}>{children}</MapContext.Provider>
  );
};

export function useGoogleMap() {
  return useContext(MapContext);
}
