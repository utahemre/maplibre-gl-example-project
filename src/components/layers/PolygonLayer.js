import { v4 as uuidv4 } from 'uuid';

export function polygonLayer(_sourceId, _layerProperties) {
    let layerId = uuidv4();
    return (
        {
            'id': layerId,
            'type': 'fill',
            'source': _sourceId,
            'paint': {
                'fill-color': _layerProperties['fill-color'] ? _layerProperties['fill-color'] : 'red',
                'fill-opacity': _layerProperties['fill-opacity'] ? _layerProperties['fill-opacity'] : 0.8,
                'fill-outline-color' :  _layerProperties['fill-outline-color'] ? _layerProperties['fill-outline-color'] : 'black',
                }
        }
    );
}

export function polygonLayer3D(_sourceId, _layerProperties) {
    let layerId = uuidv4();
    return (
        {
            'id': layerId,
            'type': 'fill-extrusion',
            'source': _sourceId,
            'paint': {
                'fill-extrusion-color': _layerProperties['fill-extrusion-color'] ? _layerProperties['fill-extrusion-color'] : 'red',
                'fill-extrusion-opacity': _layerProperties['fill-extrusion-opacity'] ? _layerProperties['fill-extrusion-opacity'] : 0.8,
                'fill-extrusion-base': _layerProperties['fill-extrusion-base'] ? _layerProperties['fill-extrusion-base'] : 0,
                'fill-extrusion-height': _layerProperties['fill-extrusion-height'] ? _layerProperties['fill-extrusion-height'] : 100,
                }
        }
    );
}