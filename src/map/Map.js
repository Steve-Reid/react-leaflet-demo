import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import { MarkerLayer } from "../layers/marker_layer";
import { cities } from "../data/cities";
import { MarkerLayerWithTooltip } from "../layers/marker_layer_with_tooltip";
import { mountains } from "../data/highest_points";

function Map() {
  const [radiusFilter, setRadiusFilter] = useState(null);

  const getRadiusFilter = () => radiusFilter;

  return (
    <MapContainer center={[0, 0]} zoom={3} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerLayer
        data={cities}
        setRadiusFilter={setRadiusFilter}
        getRadiusFilter={getRadiusFilter}
      />
      <MarkerLayerWithTooltip data={mountains} />
    </MapContainer>
  );
}

export default Map;
