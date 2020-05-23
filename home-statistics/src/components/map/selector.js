import React from 'react';

export const Selector = ({ mapStyle,  mapType, setMapStyle}) => (
    <div className="map-type-selector">
        <label className="item">
            Cases #:
        </label>
        <label className="item">
            <input type="radio" name="test" value={mapType.cases}
                checked={mapStyle === mapType.cases}
                onChange={() => { setMapStyle(mapType.cases); }} />
            Total
        </label>
        <label className="item">
            <input type="radio" name="test" value={mapType.active}
            checked={mapStyle === mapType.active}
            onChange={() => { setMapStyle(mapType.active); }} />
            Active
        </label>
        <label className="item">
            <input type="radio" name="test" value={mapType.recovered}
            checked={mapStyle === mapType.recovered}
            onChange={() => { setMapStyle(mapType.recovered); }} />
            Recovered
        </label>
        <label className="item">
            <input type="radio" name="test" value={mapType.tests}
            checked={mapStyle === mapType.tests}
            onChange={() => { setMapStyle(mapType.tests); }} />
            Tests
        </label>
    </div>
)
