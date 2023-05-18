import { v4 as uuidv4 } from 'uuid';

export function lineLayer(_sourceId, _layerProperties) {
    let layerId = uuidv4();
    return (
        {
            'id': layerId,
            'type': 'line',
            'source': _sourceId,
            'paint': {
                'line-color': _layerProperties['line-color'] ? _layerProperties['line-color'] : 'red',
                'line-opacity': _layerProperties['line-opacity'] ? _layerProperties['line-opacity'] : 0.8,
                'line-width' :  _layerProperties['line-width'] ? _layerProperties['line-width'] : 1,
                }
        }
    );
}