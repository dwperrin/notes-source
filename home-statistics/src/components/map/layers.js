import React from 'react';
import { Source, Layer } from 'react-map-gl';

import { caseLevels, testLevels, activeLevels } from 'data-services'

const getCaseColorSchema = () => ([
    0, 'transparent',
    caseLevels[0].key, '#ffb3b3',
    caseLevels[1].key, '#ff8080',
    caseLevels[2].key, '#ff4d4d',
    caseLevels[3].key, '#e60000',
    caseLevels[4].key, '#b30000',
    caseLevels[5].key, '#660000'
]);

const getTestColorSchema = () => ([
    0,'transparent',
    testLevels[0].key, '#a6c6ed',
    testLevels[1].key, '#8ab3e6',
    testLevels[2].key, '#6189ba',
    testLevels[3].key, '#4478b8',
    testLevels[4].key, '#326cb3',
    testLevels[5].key, '#1a5cad'
]);

const getActiveColorSchema = () => ([
    0,'transparent',
    activeLevels[0].key, '#ffb3b3',
    activeLevels[1].key, '#ff8080',
    activeLevels[2].key, '#ff4d4d',
    activeLevels[3].key, '#e60000',
    activeLevels[4].key, '#b30000',
]);

/*

testLevels[0].key, '#f0eceb',
    testLevels[1].key, '#d4d0cf',
    testLevels[2].key, '#bab7b6',
    testLevels[3].key, '#a6a2a1',
    testLevels[4].key, '#787574',
    testLevels[5].key, '#636160'

*/

export const layers = {
    casesId: 'PostcodeCases',
    testsId: 'PostcodeTests',
    activeId: 'PostcodeActive'
}

export const source = (data, selectedDate) => (
    <Source type="geojson" data={data}>
        <Layer
            id="Postcode"
            source="Postcode"
            type="line"
            paint={{
                "line-color": "#bdb8b7",
                "line-width": 1
            }}
        />
        <Layer
            id={layers.testsId}
            source="Postcode"
            type="fill"
            paint={{
                'fill-color': [
                    'interpolate',
                    ['linear'],
                    ['get', `${selectedDate}-testRange`],
                    ...getTestColorSchema()
                ],
                'fill-opacity': 0.8
            }}
        />
        <Layer
            id={layers.activeId}
            source="Postcode"
            type="fill"
            paint={{
                'fill-color': [
                    'interpolate',
                    ['linear'],
                    ['get', `${selectedDate}-activeRange`],
                    ...getActiveColorSchema()
                ],
                'fill-opacity': 0.8
            }}
        />
        <Layer
            id={layers.casesId}
            source="Postcode"
            type="fill"
            paint={{
                'fill-color': [
                    'interpolate',
                    ['linear'],
                    ['get', selectedDate],
                    ...getCaseColorSchema()
                ],
                'fill-opacity': 0.8
            }}
        />
    </Source>
)

export const swap = (map, mapStyle, mapType) => {
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
}
