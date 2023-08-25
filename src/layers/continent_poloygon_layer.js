import { GeoJSON } from "react-leaflet";

export const ContinentPolygonLayer = ({ data, setGeoFilter, getGeoFilter }) => {
  const geoFilter = getGeoFilter();

  return (
    <GeoJSON
      key="geo-json-layer"
      data={data}
      eventHandlers={{
        click: (e) =>
          setGeoFilter((prevState) => {
            const same = prevState === e.propagatedFrom.feature;
            // removes filter if same continent clicked again
            return same ? null : e.propagatedFrom.feature;
          }),
      }}
      style={(feature) => ({
        color: geoFilter === feature ? "red" : "blue",
        weight: 0.5,
        fillOpacity: 0.4,
      })}
    />
  );
};
