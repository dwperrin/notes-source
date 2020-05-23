import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './map.css';

import React, { useState, useRef, useContext, useEffect } from 'react';
import MapGL from 'react-map-gl';
import { DataContext } from 'components/data-context';
import { bagKeys } from 'data-services';
import { source, layers, swap } from './layers';
import { GeoCoder } from './geo-coder';
import { usePopup, Popup } from './popup';
import { Selector } from './selector';

const token = "pk.eyJ1IjoibWF4LW1hcGJveCIsImEiOiJjazh2M2Nxa2wwN2lqM21sZHR6OGltODZlIn0.WZQrkr5xUuF2pYodrApo-g";

const mapType = Object.freeze({
    cases: layers.casesId,
    tests: layers.testsId,
    active: layers.activeId,
    recovered: layers.recoveredId
});

export const Map = () => {
    const { postCodes, selectedDate } = useContext(DataContext);
    const [viewport, setViewport] = useState({
        zoom: 5,
        latitude: -32.8688,
        longitude: 150.0093
    });
    const [mapStyle, setMapStyle] = useState('');
    const mapRef = useRef(null);
    const geoCoderRef = useRef(null);
    const [popup, setPopup] = usePopup(() => bagKeys(selectedDate))

    useEffect(() => {
        const map = mapRef.current.getMap();
        swap(map, mapStyle, mapType);

    }, [mapStyle]);

    const handleGeocoderViewportChange = (viewport) => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 }

        return setViewport({
            ...viewport,
            ...geocoderDefaultOverrides
        })
    }

    const handleClick = (e) => {
        setPopup(e.features || null, e.lngLat);
    }

    return (
        <div className="map">
            <div ref={geoCoderRef} className="geocoder"></div>
            <MapGL
                ref={mapRef}
                {...viewport}
                width="100vw"
                height="500px"
                mapStyle="mapbox://styles/mapbox/streets-v10"
                onViewportChange={nextViewport => setViewport(nextViewport)}
                onLoad={() => { setMapStyle(mapType.cases); }}
                mapboxApiAccessToken={token}
                onClick={handleClick}>
                <GeoCoder
                    mapRef={mapRef}
                    containerRef={geoCoderRef}
                    onViewportChange={handleGeocoderViewportChange}
                    token={token}
                />
                {postCodes && source(postCodes, selectedDate)}
                {popup.show && <Popup {...popup} />}
            </MapGL>
            <Selector {...{ mapStyle, mapType, setMapStyle }} />
        </div>
    );
}
