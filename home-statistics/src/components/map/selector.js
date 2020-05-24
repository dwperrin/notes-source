import React from 'react';

export const Selector = ({ mapStyle,  mapType, setMapStyle}) => {

    const items = [{
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
    },]
    .map(({ key, name}) => (
        <label key={key} className={`item${mapStyle === key ? ' selected' : ''}`}>
            <input type="radio" name="test" value={key}
                checked={mapStyle === key}
                onChange={() => { setMapStyle(key); }} />
            {name}
        </label>
    ));

    return (
        <div className="map-type-selector">
            <label className="item">
                Cases #:
            </label>
            {items}
        </div>
    );
}
