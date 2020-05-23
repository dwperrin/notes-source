import {
    caseLevels,
    testLevels,
    activeLevels,
    recoveredLevels,
    bagKeys } from './levels';

const formatMap = (data) =>
    data.data.reduce((acc, curr) => {
        const rootEntry = acc.has(curr.Date) ? acc.get(curr.Date) : new Map();

        acc.set(curr.Date, rootEntry);
        rootEntry.set(curr.POA_NAME16, curr);

        return acc;
    }, new Map());

const formatPopulation = (data) =>
    data.reduce((acc, curr) => {
        const key = curr.POA_NAME16.toString();
        const entry = acc.has(key) ? acc.get(key) : curr;
        acc.set(key, entry);

        return acc;
    }, new Map());


const getLevelKey = (levels) => (count) =>
    levels.find(item => {
        if(item.start === undefined &&
            count <= item.end) {
                return true;
        }

        if(item.end === undefined &&
            count >= item.start) {
                return true;
        }

        if(item.start <= count && count <= item.end) {
            return true;
        }

        return false;
    }).key;

export const mergeData = ({
    postCodes,
    cases: casesInitial,
    population: populationInitial,
    tests: testsInitial }) => {

    if(!postCodes) {
        return { };
    }

    const caseLevelKey = getLevelKey(caseLevels);
    const testLevelKey = getLevelKey(testLevels);
    const activeLevelsKey = getLevelKey(activeLevels);
    const recoveredLevelsKey = getLevelKey(recoveredLevels);

    const cases = formatMap(casesInitial);
    const tests = formatMap(testsInitial);
    const population = formatPopulation(populationInitial);

    const dates = Array.from(cases.keys());
    const selectedDate = dates[dates.length - 1];

    postCodes.features.forEach(feature => {
        dates.forEach(date => {
            const caseEntry = cases.get(date);
            const testsEntry = tests.get(date);

            const { testsKey, activeKey, totalKey, recoveredKey, deadKey,
                rangeTestsKey, rangeActiveKey, rangeRecoveredKey } = bagKeys(date);

            feature.properties[date] = 0;

            feature.properties[testsKey] = 0;
            feature.properties[activeKey] = 0;
            feature.properties[totalKey] = 0;
            feature.properties[recoveredKey] = 0;
            feature.properties[deadKey] = 0;

            // ranges
            feature.properties[rangeTestsKey] = 0;
            feature.properties[rangeActiveKey] = 0;
            feature.properties[rangeRecoveredKey] = 0;

            if(caseEntry.has(feature.properties.POA_NAME16)) {
                const caseEntryValue = caseEntry.get(feature.properties.POA_NAME16);
                const total = parseInt(caseEntryValue.Cases);
                const recovered = parseInt(caseEntryValue.Recovered);
                const dead = parseInt(caseEntryValue.Deaths);
                const active = total - (recovered + dead);

                feature.properties[date] = caseLevelKey(total);
                feature.properties[rangeActiveKey] = activeLevelsKey(active);
                feature.properties[rangeRecoveredKey] = recoveredLevelsKey(recovered);

                feature.properties[totalKey] = total;
                feature.properties[activeKey] = active;
                feature.properties[recoveredKey] = recovered;
                feature.properties[deadKey] = dead;
            }

            if(testsEntry.has(feature.properties.POA_NAME16)) {
                const testEntryValue = testsEntry.get(feature.properties.POA_NAME16);
                const total = parseInt(testEntryValue.Number);
                const testRange = testLevelKey(total);

                feature.properties[testsKey] = total;
                feature.properties[rangeTestsKey] = testRange;
            }
        });

        if(population.has(feature.properties.POA_NAME16)) {
            const populationEntry = population.get(feature.properties.POA_NAME16);
            feature.properties.population = populationEntry.Tot_p_p;
            feature.properties.suburbName = populationEntry.Combined;
        }
    });

    return { postCodes, cases, population, tests, selectedDate };
}
