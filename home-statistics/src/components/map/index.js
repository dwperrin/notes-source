import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './map.css';

import React, { useState, useRef, useContext, useEffect } from 'react';
import MapGL from 'react-map-gl';
import { DataContext } from 'components/data-context';
import { bagKeys } from 'data-services';
import { source, layers, swap } from './layers';
import { GeoCoder } from './geo-coder';
import { usePopup, Popup } from './popup';
import { Selector } from 'components/selector';
import { token } from 'utils/map';

const mapType = Object.freeze({
    cases: layers.casesId,
    tests: layers.testsId,
    active: layers.activeId,
    recovered: layers.recoveredId
});

const selectorData = [{
    key: mapType.cases,
    name: 'Total'
}, {
    key: mapType.active,
    name: 'Active'
},{
    key: mapType.recovered,
    name: 'Recovered'
},{
    key: mapType.tests,
    name: 'Tests'
}];

export const Map = () => {
    const { postCodes, selectedDate } = useContext(DataContext);
    const [viewport, setViewport] = useState({
        zoom: 6,
        latitude: -32.8688,
        longitude: 148.0093
    });
    const [mapStyle, setMapStyle] = useState('');
    const mapRef = useRef(null);
    const geoCoderRef = useRef(null);
    const [popup, setPopup] = usePopup(() => bagKeys(selectedDate))

    useEffect(() => {
        const map = mapRef.current?.getMap();
        if(map) {
            swap(map, mapStyle, mapType);
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
        setPopup(e.features || null, e.lngLat);
    }

    if(!postCodes) {
        return null;
    }

    return (
        <div className="map">
            <Selector
                data={selectorData}
                notifySelected={setMapStyle}
                title="Cases #"
             />
            <div ref={geoCoderRef} className="geocoder"></div>
            <MapGL
                ref={mapRef}
                {...viewport}
                width="100%"
                height="700px"
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
                {source(postCodes, selectedDate)}
                {popup.show && <Popup {...popup} />}
            </MapGL>
        </div>
    );
}
