import { GeoJSON, LayersControl } from "react-leaflet";

export const ContinentPolygonLayer = ({ data, setGeoFilter, getGeoFilter }) => {
  const geoFilter = getGeoFilter();

  const layer = (
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

  return (
    <LayersControl.Overlay checked name="Continents">
      {layer}
    </LayersControl.Overlay>
  );
};
