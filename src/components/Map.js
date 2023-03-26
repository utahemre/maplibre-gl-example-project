import { useEffect } from "react"
import maplibregl from 'maplibre-gl';

const Map = () => {
    useEffect( () => {
        const map = new maplibregl.Map({
            container: 'map',
            style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
            center: [34, 40], // starting position [lng, lat]
            zoom: 4 // starting zoom
            });
    }, []);

    return (
        <div id='map' style={{width: "800px", height: "600px"}}></div>
    )

}
export default Map;