import React, { useContext, useMemo, useState } from 'react';
import { Bar } from 'recharts';

import { DataContext } from 'components/data-context';
import { Totals as TotalsInternal } from './total';

const legend = (key) => {
    switch(key){
        case 'cases': return 'Total Cases';
        case 'active': return 'Active';
        case 'recovered': return 'Recovered';
        case 'tests': return 'Total Tests';
        case 'recentTests': return 'Recent Tests';
        default: return key;
    }
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

export const Totals = () => {

    const { cases, tests, selectedDate } = useContext(DataContext);
    const [ displayType, setDisplayType ] = useState(DisplayType.group);

    const data = useMemo(() => {

        const testsEntry = tests.get(selectedDate);

        return [...cases.get(selectedDate).values()]
        .filter(item => item.POA_NAME16)
        .map(item => {

            const displayTests = testsEntry.get(item.POA_NAME16);

            return {
                cases: item.Cases,
                active: item.Active,
                recovered: item.Recovered,
                name: item.POA_NAME16,
                ...(displayTests && { tests: displayTests.Number, recentTests: displayTests.Recent })
            };
        });
    }
    , [cases, tests, selectedDate]);

    const render = () => {
        if(displayType === DisplayType.group) {
            return (
                <TotalsInternal
                    getBars={() =>
                        [
                            <Bar key="1" dataKey="cases" fill="#ff8080" />,
                            <Bar key="2" dataKey="active" fill="#e60000" />,
                            <Bar key="3" dataKey="recovered" fill="#0a6624" />,
                            <Bar key="4" dataKey="tests" fill="#6189ba" />,
                            <Bar key="5" dataKey="recentTests" fill="#6189ba" />
                        ]
                    }
                    data={data}
                    getTooltipLabel={tooltipLabel}
                    getTooltipValue={tooltipValue}
                    getLegendLabel={legend}
                />
            );
        }

        return (
            <>
                <TotalsInternal
                    getBars={() => <Bar dataKey="cases" fill="#ff8080" />}
                    data={data}
                    getTooltipLabel={tooltipLabel}
                    getTooltipValue={tooltipValue}
                    getLegendLabel={legend}
                />
                <TotalsInternal
                    data={data}
                    getBars={() => <Bar dataKey="active" fill="#e60000" />}
                    getTooltipLabel={tooltipLabel}
                    getTooltipValue={tooltipValue}
                    getLegendLabel={legend}
                />
                <TotalsInternal
                    data={data}
                    getBars={() => <Bar dataKey="recovered" fill="#0a6624" />}
                    getTooltipLabel={tooltipLabel}
                    getTooltipValue={tooltipValue}
                    getLegendLabel={legend}
                />
                <TotalsInternal
                    data={data}
                    getBars={() => <Bar dataKey="tests" fill="#6189ba" />}
                    getTooltipLabel={tooltipLabel}
                    getTooltipValue={tooltipValue}
                    getLegendLabel={legend}
                />
                <TotalsInternal
                    dataKey="value"
                    data={data}
                    getBars={() => <Bar dataKey="recentTests" fill="#1a5cad" />}
                    getTooltipLabel={tooltipLabel}
                    getTooltipValue={tooltipValue}
                    getLegendLabel={legend}
                />
            </>
        );
    }


    return (
        <>
            <select onChange={(e) => {
                const value = e.target.value;
                setTimeout(() => {
                    setDisplayType(value);
                }, 0);
            }}>
                <option value={DisplayType.group} >Show grouped</option>
                <option value={DisplayType.nonGroup} >Show separate</option>
            </select>
            {render()}
        </>
    );
}
