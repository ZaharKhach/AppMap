import Map, { Marker, Popup } from 'react-map-gl';
import LocationOn from '@material-ui/icons/LocationOn';
import Star from "@material-ui/icons/Star";
import './app.css'

function App() {
  let zoom = 5;
  return (
    <>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPTOKEN}
        initialViewState={{
          longitude: 33.2304,
          latitude: 48.5,
          zoom: zoom
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
      >
        <Marker
          latitude={48.858093}
          longitude={2.294694}
        >
          <LocationOn style={{ fontSize: zoom * 7, color: 'slateblue' }} />
        </Marker>
        {/* <Popup longitude={2.294694} latitude={48.858093}
          anchor="left"
        >
          <div className="card">
            <label>Place</label>
            <h4 className='place'>Eiffel Tower</h4>
            <label>Review</label>
            <p className='desc'>Beutiful place. I like it.</p>
            <label>Rating</label>
            <div className='stars'>
              <Star className='star' />
              <Star className='star' />
              <Star className='star' />
              <Star className='star' />
              <Star className='star' />
            </div>
            <label>Ingormation</label>
            <span className='username'>Created by <b>safak</b></span>
            <span className='date'>1 hour ago</span>
          </div>
        </Popup> */}
      </Map >
    </>

  );
}

export default App;
