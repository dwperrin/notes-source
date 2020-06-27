import './corelation.css'

import React, { useContext, useMemo, useState } from 'react';
import { DataContext, Selector } from 'components';
import { ScatterPlot } from './scatter-plots';
import { Numbers } from './numbers'

const selectorData = [{
    key: 'numbers',
    name: 'Numbers'
},{
    key: 'by-pair',
    name: 'By Pair'
},{
    key: 'grouped',
    name: 'Grouped'
}];


export const Corelation = () => {
    const { cases, population, selectedDate } = useContext(DataContext);
    const [ displayType, setDisplayType ] = useState(selectorData[0].key);

    const plots = useMemo(() => {

        if(!population) {
            return [];
        }

        const casesByCode = cases.get(selectedDate);

        const result = population.reduce((acc, curr) => {
            const postalCode = curr.POA_NAME16.toString();

            if(casesByCode.has(postalCode)) {
                const cases = casesByCode.get(postalCode);

                acc.push({
                    population: curr.Tot_p_p,
                    totalCases: cases.Cases,
                    active: cases.Active,
                    recovered: cases.Recovered,
                    tests: cases.Tests
                });
            }

            return acc;

        }, []);

        const byPopulation = result.map(_ => _);
        byPopulation.sort((a, b) => a.population - b.population);

        const byCases = result.map(_ => _);
        byCases.sort((a, b) => a.totalCases - b.totalCases);

        const byActive = result.map(_ => _);
        byActive.sort((a, b) => a.active - b.active);

        const byRecovered = result.map(_ => _);
        byRecovered.sort((a, b) => a.recovered - b.recovered);

        const byTests = result.map(_ => _);
        byTests.sort((a, b) => a.tests - b.tests);

        return [{
            id: 1,
            cell: "population-population",
            isDiagonal: true,
            data: population,
        },{
            id: 2,
            cell: "population-cases",
            isDiagonal: false,
            data: byCases,
            axis: { keys: ["totalCases", "population"], names: ["Total Cases", "Population"] },
            color: '#8884d8'
        },{
            id: 3,
            cell: "population-active",
            isDiagonal: false,
            data: byActive,
            axis: { keys: ["active", "population"], names: ["Active", "Population"] },
            color: '#8884d8'
        },{
            id: 4,
            cell: "population-recovered",
            isDiagonal: false,
            data: byRecovered,
            axis: { keys: ["recovered", "population"], names: ["Recovered", "Population"] },
            color: '#8884d8'
        },{
            id: 5,
            cell: "population-tests",
            isDiagonal: false,
            data: byTests,
            axis: { keys: ["tests", "population"], names: ["Tests", "Population"] },
            color: '#8884d8'
        },{
            id: 6,
            cell: "cases-population",
            isDiagonal: false,
            data: byPopulation,
            axis: { keys: ["population", "totalCases"], names: ["Population", "Total Cases"] },
            color: '#8884d8'
        },{
            id: 7,
            cell: "cases-cases",
            isDiagonal: true,
            data: byCases,
        },{
            id: 8,
            cell: "cases-active",
            isDiagonal: false,
            data: byActive,
            axis: { keys: ["active", "totalCases"], names: ["Active", "Total Cases"] },
            color: '#8884d8'
        },{
            id: 9,
            cell: "cases-recovered",
            isDiagonal: false,
            data: byRecovered,
            axis: { keys: ["recovered", "totalCases"], names: ["Recovered", "Total Cases"] },
            color: '#8884d8'
        }, {
            id: 10,
            cell: "cases-tests",
            isDiagonal: false,
            data: byTests,
            axis: { keys: ["tests", "totalCases"], names: ["Tests", "Total Cases"] },
            color: '#8884d8'
        },{
            id: 11,
            cell: "active-population",
            isDiagonal: false,
            data: byPopulation,
            axis: { keys: ["population", "active"], names: ["Population", "Active"] },
            color: '#8884d8'
        },{
            id: 12,
            cell: "active-cases",
            isDiagonal: false,
            data: byCases,
            axis: { keys: ["totalCases", "active"], names: ["Total Cases", "Active"] },
            color: '#8884d8'
        },{
            id: 13,
            cell: "active-active",
            isDiagonal: true,
            data: byActive
        },{
            id: 14,
            cell: "active-recovered",
            isDiagonal: false,
            data: byRecovered,
            axis: { keys: ["recovered", "active"], names: ["Recovered", "Active"] },
            color: '#8884d8'
        },{
            id: 15,
            cell: "active-tests",
            isDiagonal: false,
            data: byTests,
            axis: { keys: ["tests", "active"], names: ["Tests", "Active"] },
            color: '#8884d8'
        },{
            id: 16,
            cell: "recovered-population",
            isDiagonal: false,
            data: byPopulation,
            axis: { keys: ["population", "recovered"], names: ["Population", "Recovered"] },
            color: '#8884d8'
        },{
            id: 17,
            cell: "recovered-cases",
            isDiagonal: false,
            data: byCases,
            axis: { keys: ["totalCases", "recovered"], names: ["Total cases", "Recovered"] },
            color: '#8884d8'
        },{
            id: 18,
            cell: "recovered-active",
            isDiagonal: false,
            data: byActive,
            axis: { keys: ["active", "recovered"], names: ["Active", "Recovered"] },
            color: '#8884d8'
        },{
            id: 19,
            cell: "recovered-recovered",
            isDiagonal: true,
            data: byRecovered
        },{
            id: 20,
            cell: "recovered-tests",
            isDiagonal: false,
            data: byTests,
            axis: { keys: ["tests", "recovered"], names: ["Tests", "Recovered"] },
            color: '#8884d8'
        },{
            id: 21,
            cell: "tests-population",
            isDiagonal: false,
            data: byPopulation,
            axis: { keys: ["population", "tests"], names: ["Population", "Tests"] },
            color: '#8884d8'
        },{
            id: 22,
            cell: "tests-cases",
            isDiagonal: false,
            data: byCases,
            axis: { keys: ["totalCases", "tests"], names: ["Total cases", "Tests"] },
            color: '#8884d8'
        },{
            id: 23,
            cell: "tests-active",
            isDiagonal: false,
            data: byActive,
            axis: { keys: ["active", "tests"], names: ["Active", "Tests"] },
            color: '#8884d8'
        },{
            id: 24,
            cell: "tests-recovered",
            isDiagonal: false,
            data: byRecovered,
            axis: { keys: ["recovered", "tests"], names: ["Recovered", "Tests"] },
            color: '#8884d8'
        },{
            id: 25,
            cell: "tests-tests",
            isDiagonal: true,
            data: byTests
        }];

    }, [selectedDate, cases, population]);

    const render = () => {

        if(displayType === selectorData[0].key) {
            return <Numbers plots={plots} />
        }

        if(displayType === selectorData[1].key) {
            return <ScatterPlot plots={plots} byName={true} />
        }

        if(displayType === selectorData[2].key) {
            return <ScatterPlot plots={plots} byName={false} />
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
