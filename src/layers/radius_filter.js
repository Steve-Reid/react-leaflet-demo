import { Circle } from "react-leaflet";

export const RadiusFilter = ({ radiusFilter, setRadiusFilter }) => {
  if (radiusFilter) {
    const { coordinates } = radiusFilter.feature.geometry;
    return (
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
  }

  return null;
};
