import "./App.css";

import "leaflet/dist/leaflet.css";
import "@changey/react-leaflet-markercluster/dist/styles.min.css";
import Map from "./map/Map";

function App() {
  return (
    <div>
      <Map />
    </div>
  );
}

export default App;
