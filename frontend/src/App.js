import Map, { Marker } from 'react-map-gl';
import LocationOn from '@material-ui/icons/LocationOn';

function App() {
  return (
    <>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPTOKEN}
        initialViewState={{
          longitude: 33.2304,
          latitude: 48.5,
          zoom: 5
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v10"
      >
        <Marker longitude={-100} latitude={40} offsetLeft={-20} offsetTop={-10}>
          <LocationOn />
        </Marker>
      </Map>
    </>

  );
}

export default App;
