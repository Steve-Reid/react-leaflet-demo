import { Circle, LayersControl } from "react-leaflet";

export const RadiusFilter = ({ radiusFilter, setRadiusFilter }) => {
  if (radiusFilter) {
    const { coordinates } = radiusFilter.feature.geometry;
    const layer = (
      <Circle
        center={[coordinates[1], coordinates[0]]}
        radius={radiusFilter.radius * 1000} // m to km
        eventHandlers={{
          dblclick: (e) => {
            // stop double click event bubbling up and triggering a zoom
            e.originalEvent.view.L.DomEvent.stopPropagation(e);

            setRadiusFilter(null);
          },
        }}
        color="gray"
        weight={1}
        fillOpacity={0.4}
      />
    );

    return (
      <LayersControl.Overlay checked name="Radius Filter">
        {layer}
      </LayersControl.Overlay>
    );
  }

  return null;
};
