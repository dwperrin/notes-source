import React from 'react';
import Geocoder from 'react-map-gl-geocoder';

const getCodeFilter = (item) => {
    if (!item.context) {
        return item;
    }

    if (item.context.length <= 4) {
        return item.context.map(function (i) {
            // id is in the form {index}.{id} per https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
            // this example attempts to find the `region` named `New South Wales`
            return (i.id.split('.').shift() === 'region' && i.text === 'New South Wales');
        }).reduce(function (acc, cur) {
            return acc || cur;
        });
    }
}

export const GeoCoder = ({ mapRef, containerRef, token, onViewportChange }) => (
    <Geocoder
        mapRef={mapRef}
        containerRef={containerRef}
        countries="au"
        bbox={[139.965, -38.030, 155.258, -27.839]}
        limit={200}
        onViewportChange={onViewportChange}
        mapboxApiAccessToken={token}
        filter={getCodeFilter}
    />
)

