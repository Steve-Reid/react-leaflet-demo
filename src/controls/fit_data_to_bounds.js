import ReactDOM from "react-dom";
import { Button } from "antd";
import { BorderOuterOutlined } from "@ant-design/icons";

// eslint-disable-next-line import/no-extraneous-dependencies
import { createControlComponent } from "@react-leaflet/core";
import { Control, DomUtil } from "leaflet";

const node = DomUtil.create("div");

Control.FitBoundsToDataControl = Control.extend({
  options: {
    position: "topleft",
  },
  onAdd(map) {
    // eslint-disable-next-line react/no-deprecated
    ReactDOM.render(
      <Button
        title="Fit bounds to wprld"
        icon={<BorderOuterOutlined />}
        onClick={() => map.fitWorld()}
      />,
    );
    return node;
  },
  onRemove(map) {
    console.log("🚀 ~ onRemove ~ map:", map);
  },
});

export const FitBoundsToDataControl = createControlComponent(
  (props) => new Control.FitBoundsToDataControl(props),
);
