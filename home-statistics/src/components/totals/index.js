import React, { useContext, useMemo } from 'react';
import { DataContext } from 'components/data-context';

import { Totals as TotalsInternal } from './total';

const tooltipLabel = (value) => `Postal Code: ${value}`;
const caseLegend = () => 'Total Cases';
const activeLegend = () => 'Active';
const recoveredLegend = () => 'Recovered';
const testsLegend = () => 'Total Tests';
const testsRecentLegend = () => 'Recent Tests';

export const Totals = () => {

    const { cases, tests, selectedDate } = useContext(DataContext);

    const {
        displayCases,
        displayActive,
        displayRecovered,
        displayTests,
        displayRecentTests
     } = useMemo(() => {
        const baseCases = [...cases.get(selectedDate).values()]
        .filter(item => item.POA_NAME16)
        .map(item => ({
            cases: { value: item.Cases, name: item.POA_NAME16 },
            active: { value: item.Active, name: item.POA_NAME16 },
            recovered: { value: item.Recovered, name: item.POA_NAME16 }
        }));

        const baseTests = [...tests.get(selectedDate).values()]
        .filter(item => item.POA_NAME16)
        .map(item => ({
            total: { value: item.Number, name: item.POA_NAME16 },
            recent: { value: item.Recent, name: item.POA_NAME16 }
        }));

        return {
            displayCases: baseCases.map(item => item.cases),
            displayActive: baseCases.map(item => item.active),
            displayRecovered: baseCases.map(item => item.recovered),
            displayTests: baseTests.map(item => item.total),
            displayRecentTests: baseTests.map(item => item.recent)
        };
    }
    , [cases, tests, selectedDate]);

    return (
        <>
            <TotalsInternal
                dataKey="value"
                data={displayCases}
                barColor="#ff8080"
                getTooltipLabel={tooltipLabel}
                getLegendLabel={caseLegend}
            />
            <TotalsInternal
                dataKey="value"
                data={displayActive}
                barColor="#e60000"
                getTooltipLabel={tooltipLabel}
                getLegendLabel={activeLegend}
            />
            <TotalsInternal
                dataKey="value"
                data={displayRecovered}
                barColor="#0a6624"
                getTooltipLabel={tooltipLabel}
                getLegendLabel={recoveredLegend}
            />
            <TotalsInternal
                dataKey="value"
                data={displayTests}
                barColor="#6189ba"
                getTooltipLabel={tooltipLabel}
                getLegendLabel={testsLegend}
            />
            <TotalsInternal
                dataKey="value"
                data={displayRecentTests}
                barColor="#1a5cad"
                getTooltipLabel={tooltipLabel}
                getLegendLabel={testsRecentLegend}
            />
        </>
    );
}
