import { GeoJSON } from "react-leaflet";

export const ContinentPolygonLayer = ({ data, setGeoFilter, getGeoFilter }) => {
  const geoFilter = getGeoFilter();
  console.log(
    "🚀 ~ file: continent_poloygon_layer.js:5 ~ ContinentPolygonLayer ~ geoFilter:",
    geoFilter,
  );

  return (
    <GeoJSON
      key="geo-json-layer"
      data={data}
      eventHandlers={{
        click: (e) => setGeoFilter(e.propagatedFrom.feature),
      }}
    />
  );
};
