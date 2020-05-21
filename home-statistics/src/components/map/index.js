import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './map.css';

import React, { useState, useRef, useContext, useEffect } from 'react';
import MapGL, { Popup } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import { DataContext } from 'components/data-context';
import { bagKeys } from 'data-services';
import { source, layers } from './layers';
import { getCodeFilter } from './geo-coder';

const token = "pk.eyJ1IjoibWF4LW1hcGJveCIsImEiOiJjazh2M2Nxa2wwN2lqM21sZHR6OGltODZlIn0.WZQrkr5xUuF2pYodrApo-g";

const mapType = Object.freeze({
    cases: layers.casesId,
    tests: layers.testsId,
    active: layers.activeId,
    next: (value) => {
        const map = {
            [mapType.cases]: mapType.tests,
            [mapType.tests]: mapType.active,
            [mapType.active]: mapType.cases
        }

        return map[value];
    }
});

export const Map = () => {
    const { postCodes, selectedDate } = useContext(DataContext);

    const [viewport, setViewport] = useState({
        zoom: 5,
        latitude: -32.8688,
        longitude: 150.0093
    });

    const [mapStyle, setMapStye] = useState('');

    const [popup, setPopup] = useState({
        show: false,
        latitude: undefined,
        longitude: undefined,
        suburb: undefined,
        total: undefined,
        tested: undefined,
        active: undefined,
        recovered: undefined,
        dead: undefined,
        population: undefined
    });

    const mapRef = useRef(null);
    const geoCoderRef = useRef(null);

    useEffect(() => {
        const map = mapRef.current.getMap();

        if(mapStyle === mapType.cases) {
            map.setLayoutProperty(layers.testsId, 'visibility', 'none');
            map.setLayoutProperty(layers.casesId, 'visibility', 'visible');
            map.setLayoutProperty(layers.activeId, 'visibility', 'none');

        } else if(mapStyle === mapType.tests) {
            map.setLayoutProperty(layers.testsId, 'visibility', 'visible');
            map.setLayoutProperty(layers.casesId, 'visibility', 'none');
            map.setLayoutProperty(layers.activeId, 'visibility', 'none');

        } else if(mapStyle === mapType.active) {
            map.setLayoutProperty(layers.testsId, 'visibility', 'none');
            map.setLayoutProperty(layers.casesId, 'visibility', 'none');
            map.setLayoutProperty(layers.activeId, 'visibility', 'visible');
        }
    }, [mapStyle]);

    const handleGeocoderViewportChange = (viewport) => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 }

        return setViewport({
            ...viewport,
            ...geocoderDefaultOverrides
        })
    }

    const handleClick = (e) => {
        if(!e || !e.features ||
            e.features.length <=0 || !e.features[0].properties.POA_NAME16) {
            setPopup({...popup, show: false});
            return;
        }

        const suburbs = e.features[0].properties.suburbName.split(',');
        const suburb = suburbs.slice(0, Math.min(3, suburbs.length)).join(', ');
        const population =  e.features[0].properties.population;

        const properties =  e.features[0].properties;
        const propertyKeys = bagKeys(selectedDate);
        const total = properties[propertyKeys.totalKey];
        const tested = properties[propertyKeys.testsKey];
        const active = properties[propertyKeys.activeKey];
        const recovered = properties[propertyKeys.recoveredKey];
        const dead = properties[propertyKeys.deadKey];

        setPopup({
            ...popup,
            show: true,
            latitude: e.lngLat[1],
            longitude: e.lngLat[0],
            suburb,
            total,
            tested,
            active,
            recovered,
            dead,
            population
        });
    }

    return (
        <div>
            <div ref={geoCoderRef} className="geocoder"></div>
            <MapGL
            ref={mapRef}
            {...viewport}
            width="100vw"
            height="500px"
            mapStyle="mapbox://styles/mapbox/streets-v10"
            onViewportChange={nextViewport => setViewport(nextViewport)}
            onLoad={() => { setMapStye(mapType.cases); }}
            mapboxApiAccessToken={token}
            onClick={handleClick}
        >
            <Geocoder
                mapRef={mapRef}
                containerRef={geoCoderRef}
                countries="au"
                bbox={[139.965, -38.030, 155.258, -27.839]}
                limit={200}
                onViewportChange={handleGeocoderViewportChange}
                mapboxApiAccessToken={token}
                filter={getCodeFilter}
            />
            {postCodes && source(postCodes, selectedDate)}
            {popup.show && <Popup
                latitude={popup.latitude}
                longitude={popup.longitude}
                closeButton={false}
                closeOnClick={false}
                >
                <div>
                    <strong>{popup.suburb}</strong>
                    <br/>
                    <span>Total: {popup.total}</span>
                    <br />
                    <span>Active: {popup.active}</span>
                    <br />
                    <span>Recovered: {popup.recovered}</span>
                    <br />
                    <span>Tested: {popup.tested}</span>
                    <br />
                    <span>Dead: {popup.dead}</span>
                    <br />
                    <span>Population: {popup.population}</span>
                </div>
            </Popup>}
        </MapGL>
        <button onClick={() => {
            setMapStye(mapType.next(mapStyle));
        }}>Hide</button>
        </div>
    );
}
