import { Fragment, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import StyleChanger from "./StyleChanger";
import { mapTilerKey } from "./Constants";

const Map = () => {
  
  const [map,setMap] = useState();
  
  useEffect(() => {
    const map = new maplibregl.Map({
      container: "map",
      style: "https://api.maptiler.com/maps/topo-v2/style.json?key=" + mapTilerKey, // stylesheet location
      center: [34, 40], // starting position [lng, lat]
      zoom: 4, // starting zoom
    });
    setMap(map);
  }, []);

  const changeStyleHandler = (styleAddress) => {
    map.setStyle(styleAddress);

  }

  return (
    <Fragment>
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
      <StyleChanger changeStyle={changeStyleHandler}></StyleChanger>
    </Fragment>
  );
};
export default Map;
