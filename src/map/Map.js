import { useEffect, useState } from "react";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";

import { cities } from "../data/cities";
import { mountains } from "../data/highest_points";
import { continents } from "../data/continents";

import { MarkerLayer } from "../layers/marker_layer";
import { MarkerLayerWithTooltip } from "../layers/marker_layer_with_tooltip";
import { RadiusFilter } from "../layers/radius_filter";
import { ContinentPolygonLayer } from "../layers/continent_poloygon_layer";
import { FitBoundsToDataControl } from "../controls/fit_data_to_bounds";
import { ShowActiveFiltersControl } from "../controls/show_active_filters";

function Map() {
  const [geoFilter, setGeoFilter] = useState(null);
  const getGeoFilter = () => geoFilter;
  const [radiusFilter, setRadiusFilter] = useState(null);
  const getRadiusFilter = () => radiusFilter;

  const [asyncCities, setAsyncCities] = useState({ features: [] });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_populated_places_simple.geojson",
      );
      const citiesData = await response.json();
      setAsyncCities(citiesData);
    };

    fetchData().catch(console.error);
  }, []);

  console.log("🚀 ~ file: Map.js:22 ~ Map ~ asyncCities:", asyncCities);

  return (
    <MapContainer center={[0, 0]} zoom={3} scrollWheelZoom>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OSM Streets">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="ESRI World Imagery">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          />
        </LayersControl.BaseLayer>
        <MarkerLayer
          // data={cities}
          data={asyncCities}
          setRadiusFilter={setRadiusFilter}
          getRadiusFilter={getRadiusFilter}
          getGeoFilter={getGeoFilter}
        />
        <MarkerLayerWithTooltip data={mountains} />
        <RadiusFilter
          radiusFilter={radiusFilter}
          setRadiusFilter={setRadiusFilter}
        />
        <ContinentPolygonLayer
          data={continents}
          setGeoFilter={setGeoFilter}
          getGeoFilter={getGeoFilter}
        />
      </LayersControl>
      <FitBoundsToDataControl />
      <ShowActiveFiltersControl
        getFilters={() => ({ geoFilter, radiusFilter })}
      />
    </MapContainer>
  );
}

export default Map;
