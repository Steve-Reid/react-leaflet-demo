import { List } from "antd";

const RenderActiveFilters = ({ dataSource }) => {
  return (
    <List
      size="small"
      header={
        <div>
          <b>Active Filters</b>
        </div>
      }
      bordered
      dataSource={dataSource()}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
  );
};

export const ShowActiveFiltersControl = ({ getFilters }) => {
  const { geoFilter, radiusFilter } = getFilters();

  const getDisplayFilters = () => {
    const filtersToDisplay = [];

    const round = (num) => Math.round(num * 100) / 100;

    if (geoFilter) {
      filtersToDisplay.push(geoFilter.properties.CONTINENT);
    }

    if (radiusFilter) {
      const { coordinates } = radiusFilter.feature.geometry;
      const { radius } = radiusFilter;
      const radiusFilterToDisplay = `
            Centre: (Lat ${round(coordinates[1])}, Lon ${round(coordinates[0])})
            Radius: ${radius} km`;
      filtersToDisplay.push(radiusFilterToDisplay);
    }

    return filtersToDisplay.length > 0
      ? filtersToDisplay
      : ["No Filter Active"];
  };

  return (
    <div className="leaflet-bottom leaflet-left">
      <div className="leaflet-control leaflet-bar leaflet-control-layers">
        <RenderActiveFilters dataSource={getDisplayFilters} />
      </div>
    </div>
  );
};
