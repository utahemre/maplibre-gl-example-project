import { Fragment, useEffect, useRef} from "react";
import maplibregl from "maplibre-gl";
import StyleChanger from "./StyleChanger";
import { mapTilerKey } from "./Constants";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { geojsonSource } from "./sources/Sources";
import { polygonLayer, polygonLayer3D } from "./layers/PolygonLayer";
import { lineLayer } from "./layers/LineLayer";

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
      /*addGeojsonSource("https://raw.githubusercontent.com/utahemre/maplibre-gl-example-project/master/public/testdata/population.geojson",
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
      );*/
      /*addGeojsonSource("https://raw.githubusercontent.com/utahemre/maplibre-gl-example-project/master/public/testdata/population.geojson",
      addPolygonLayer3D, {'fill-extrusion-color' : 'white', 'fill-extrusion-opacity' : 0.8, 'fill-extrusion-height': ["/",["get", "population"], 50]}*/

      /*addGeojsonSource("https://raw.githubusercontent.com/utahemre/maplibre-gl-example-project/master/public/testdata/population.geojson",
      addPolygonLayer3D, {'fill-extrusion-color' : [
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
    ], 'fill-extrusion-opacity' : 0.8, 'fill-extrusion-height': ["/",["get", "population"], 50]}
 );*/

 /*addGeojsonSource("https://raw.githubusercontent.com/utahemre/maplibre-gl-example-project/master/public/testdata/rivers.geojson",
      addLineLayer, {'line-color' : 'blue', 'line-opacity' : 0.8, 'line-width' : 2}); */


      addGeojsonSource("https://raw.githubusercontent.com/utahemre/maplibre-gl-example-project/master/public/testdata/rivers.geojson",
      addLineLayer, {
        'line-color' : [
          'match',
          ['get', 'featureclass'],
          "River", "blue",
          "Lake Centerline", "red",
          "black"
        ], 
        'line-opacity' : 0.8, 
        'line-width' : ['get', 'scalerank']});  
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

  const addPolygonLayer3D = (_sourceId, _layerProperties) => {
    const polygonLayer3DInstance = polygonLayer3D(_sourceId, _layerProperties);
    map.current.addLayer(polygonLayer3DInstance);
  };

  const addLineLayer = (_sourceId, _layerProperties) => {
    const lineLayerInstance = lineLayer(_sourceId, _layerProperties);
    map.current.addLayer(lineLayerInstance);
  };

  return (
    <Fragment>
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
      <StyleChanger changeStyle={changeStyleHandler}></StyleChanger>
    </Fragment>
  );
};
export default Map;
