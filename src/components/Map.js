import { Fragment, useEffect, useRef} from "react";
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
      zoom: 5, // starting zoom
    });
    map.current.on("load", function () {
      /*addGeojsonSource("https://raw.githubusercontent.com/utahemre/maplibre-gl-example-project/master/public/testdata/population.geojson",
        addPolygonLayer, {'fill-color' : 'red', 'fill-opacity' : 0.5, 'fill-outline-color' : 'white'}
      );*/
      addGeojsonSource("https://raw.githubusercontent.com/utahemre/maplibre-gl-example-project/master/public/testdata/population.geojson",
        addPolygonLayer, {'fill-color':
        [
            'step',
            ['get', 'population'],
            '#00FF00',
            500000,
            '#FFFF00',
            1000000,
            '#FFA500',
            3000000,
            '#FF0000',
            50000000,
            '#8B0000'
        ], 'fill-opacity' : 0.5, 'fill-outline-color' : 'black'}
      );
      

    });
  }, []);

  const changeStyleHandler = (styleAddress) => {
    map.current.setStyle(styleAddress);

  }

  const addGeojsonSource = (_url, _callback, _callbackParameters) => {
    axios
      .get(
        _url
      )
      .then((response) => {
        const sourceInstance = geojsonSource(response.data);
        let sourceId = uuidv4();
        map.current.addSource(sourceId,sourceInstance);
        if(_callback){
          _callback(sourceId, _callbackParameters);
        }
        return sourceId; 
    });
  };

  const addPolygonLayer = (_sourceId, _layerProperties) => {
    const polygonLayerInstance = polygonLayer(_sourceId, _layerProperties);
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
