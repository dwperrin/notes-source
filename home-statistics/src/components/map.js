import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

import React, { useState, useRef, useContext } from 'react';
import MapGL, { Source, Layer, Popup } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder'
import { DataContext } from '.'
import { severities } from '../data-services'

const token = "";

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

const getSeverityColorSchema = () => ([
    0, '#ffe6e6',
    severities[0].key, '#ffb3b3',
    severities[1].key, '#ff8080',
    severities[2].key, '#ff4d4d',
    severities[3].key, '#e60000',
    severities[4].key, '#b30000',
    severities[5].key, '#660000'
]);

export const Map = () => {
    const { postCodes, selectedDate } = useContext(DataContext);

    const [viewport, setViewport] = useState({
        zoom: 5,
        latitude: -32.8688,
        longitude: 150.0093
    });

    const [popup, setPopup] = useState({
        show: false,
        latitude: undefined,
        longitude: undefined,
        suburb: undefined
    });

    const mapRef = useRef(null);

    const handleGeocoderViewportChange = (viewport) => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 }

        return setViewport({
            ...viewport,
            ...geocoderDefaultOverrides
        })
    }

    const handleHover = (e) => {
        if(e.features.length <=0 || !e.features[0].properties.POA_NAME16) {
            setPopup({...popup, show: false});
            return;
        }

        const suburbs = e.features[0].properties.suburbName.split(',');
        const suburb = suburbs.slice(0, Math.min(3, suburbs.length)).join(', ');

        setPopup({
            ...popup,
            show: true,
            latitude: e.lngLat[1],
            longitude: e.lngLat[0],
            suburb
        });
    }

    return (
        <MapGL
            ref={mapRef}
            {...viewport}
            width="100vw"
            height="500px"
            mapStyle="mapbox://styles/mapbox/streets-v10"
            onViewportChange={nextViewport => setViewport(nextViewport)}
            mapboxApiAccessToken={token}
            onHover={handleHover}
        >
            <Geocoder
                mapRef={mapRef}
                countries="au"
                bbox={[139.965, -38.030, 155.258, -27.839]}
                limit={200}
                onViewportChange={handleGeocoderViewportChange}
                mapboxApiAccessToken={token}
                filter={getCodeFilter}
            />
            {postCodes && <Source type="geojson" data={postCodes}>
                <Layer
                    id="Postcode"
                    source="Postcode"
                    type="line"
                    paint={{
                        "line-color": "black",
                        "line-width": 1
                    }}
                />
                <Layer
                    id="PostcodeCases"
                    source="Postcode"
                    type="fill"
                    paint={{
                        'fill-color': [
                            'interpolate',
                            ['linear'],
                            ['get', selectedDate],
                            ...getSeverityColorSchema()
                        ],
                        'fill-opacity': 0.8
                    }}
                    >
                </Layer>
            </Source>}
            {popup.show && <Popup
                latitude={popup.latitude}
                longitude={popup.longitude}
                closeButton={false}
                closeOnClick={false}
                >
                <div>{popup.suburb}</div>
            </Popup>}
        </MapGL>
    );
}
