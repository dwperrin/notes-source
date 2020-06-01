import React, { useContext, useMemo, useState } from 'react';
import { Bar } from 'recharts';
import { DataContext } from 'components/data-context';
import { Totals as TotalsInternal } from './chart';
import { Selector } from 'components/selector';

const dataKeys = Object.freeze({
    'Cases' : { id: 1, fill: '#ff8080', legend: 'Total Cases' },
    'Active': { id: 2, fill: '#e60000', legend: 'Active' },
    'Recovered': { id: 3, fill: '#0a6624', legend: 'Recovered' },
    'Tests': { id: 4, fill: '#6189ba', legend: 'Total Tests' },
    'RecentTests': { id: 5, fill: '#6189ba', legend: 'Recent Tests' }
});

const legend = (key) => {
    const result = dataKeys[key];
    return result ? result.legend : key;
}

const tooltipLabel = (value) => `Postal Code: ${value}`;
const tooltipValue = (value, name) => {
    const displayName = legend(name);
    return [value, displayName ]
}

const DisplayType = Object.freeze({
    group: 'group',
    nonGroup: 'non-group'
});

const selectorData = [{
    key: DisplayType.group,
    name: 'Grouped'
}, {
    key: DisplayType.nonGroup,
    name: 'Separate'
}];

const renderGroup = (data) => (
    <TotalsInternal
        getBars={() => Object.entries(dataKeys)
            .map(([key, item]) =>
                <Bar
                    key={item.id}
                    dataKey={key}
                    fill={item.fill}
                />
            )
        }
        data={data}
        xAxisDataKey="POA_NAME16"
        getTooltipLabel={tooltipLabel}
        getTooltipValue={tooltipValue}
        getLegendLabel={legend}
    />
);

const renderIndividual = (data) =>
    Object.entries(dataKeys)
    .map(([key, item]) =>
        <TotalsInternal
            key={item.id}
            getBars={() => <Bar dataKey={key} fill={item.fill} />}
            data={data}
            xAxisDataKey="POA_NAME16"
            getTooltipLabel={tooltipLabel}
            getTooltipValue={tooltipValue}
            getLegendLabel={legend}
    />
);

export const Totals = () => {

    const { cases, selectedDate } = useContext(DataContext);
    const [ displayType, setDisplayType ] = useState(DisplayType.group);

    const data = useMemo(() =>
        [...cases.get(selectedDate).values()],
        [cases, selectedDate]
    );

    const render = () => {
        return displayType === DisplayType.group ?
            renderGroup(data) : renderIndividual(data);
    }

    return (
        <>
            <Selector
                data={selectorData}
                title="Display"
                notifySelected={setDisplayType}
            />
            {render()}
        </>
    );
}
