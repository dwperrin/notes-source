import React, { useContext, useMemo, useState } from 'react';
import { Bar } from 'recharts';
import { DataContext } from 'components/data-context';
import { AllSuburbs } from './all-suburbs';
import { Selector } from 'components/selector';
import { BySuburb } from './by-suburb';

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

const selectorData = [{
    key: 'group',
    name: 'Grouped'
}, {
    key: 'non-group',
    name: 'Separate'
}, {
    key: 'by-suburb',
    name: 'By Suburb'
}];

const renderGroup = (data) => (
    <AllSuburbs
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
        <AllSuburbs
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

    const { cases, selectedDate, dates } = useContext(DataContext);
    const [ displayType, setDisplayType ] = useState(selectorData[0].key);

    const data = useMemo(() =>
        [...cases.get(selectedDate).values()],
        [cases, selectedDate]
    );

    const suburbData = useMemo(() => {
        return dates
        .map(date => {
            const caseEntry = cases.get(date);

            if(!caseEntry) {
                return null;
            }

            return caseEntry.get("2147")
        });
    }, [dates, cases]);

    const render = () => {

        if(displayType === selectorData[0].key) {
            return renderGroup(data);
        }

        if(displayType === selectorData[1].key) {
            return renderIndividual(data);
        }

        if(displayType === selectorData[2].key) {
            return (<BySuburb data={suburbData} />);
        }

        return (null);
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
