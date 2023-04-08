import { Fragment, useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import StyleChanger from "./StyleChanger";
import { mapTilerKey } from "./Constants";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { geojsonSource } from "./sources/Sources";
import { polygonLayer } from "./layers/PolygonLayer";

const Map = () => {
  
  const map = useRef(null);
  
  useEffect(() => {
    map.current = new maplibregl.Map({
      container: "map",
      style: "https://api.maptiler.com/maps/basic-v2/style.json?key=" + mapTilerKey, // stylesheet location
      center: [34, 40], // starting position [lng, lat]
      zoom: 4, // starting zoom
    });
    map.current.on("load", function () {
      const sourceId = addGeojsonSource(
        "https://raw.githubusercontent.com/utahemre/maplibre-gl-example-project/master/public/testdata/population.geojson",
        addPolygonLayer, {'fill-color' : 'red', 'fill-opacity' : 0.5, 'fill-outline-color' : 'white'}
        
      );
      
    });
  }, []);

  const changeStyleHandler = (styleAddress) => {
    map.current.setStyle(styleAddress);

  }

  const addGeojsonSource = (_url, _callback, _callbackProperties) => {
    axios
      .get(
        _url
      )
      .then((response) => {
        const sourceInstance = geojsonSource(response.data);
        let sourceId = uuidv4();
        map.current.addSource(sourceId,sourceInstance);
        if(_callback){
          _callback(sourceId, _callbackProperties);
        }
        return sourceId; 
    });
  };

  const addPolygonLayer = (sourceId, _layerProperties) => {
    const polygonLayerInstance = polygonLayer(sourceId, _layerProperties);
    map.current.addLayer(polygonLayerInstance);
};



  return (
    <Fragment>
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
      <StyleChanger changeStyle={changeStyleHandler}></StyleChanger>
    </Fragment>
  );
};
export default Map;
