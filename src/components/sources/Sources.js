export function geojsonSource(_data) {
    return (
        {
            'type': 'geojson',
            'data': _data,
        }
    );
}