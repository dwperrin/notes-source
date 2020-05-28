import React, { createContext, useEffect, useState } from 'react';
import { mergeData } from 'data-services'

export const DataContext = createContext({});
export const DataConsumer = DataContext.Consumer;
const ContextProvider = DataContext.Provider;

const importData = async () => {
    const postCodes = await import('data/post-codes.json');
    const cases = await import('data/cases.json');
    const population = await import('data/population.json');
    const tests = await import('data/tests.json');

    return { postCodes, cases, population, tests };
}

export const DataProvider = ({ children }) => {

    const [data, setData] = useState({});

    useEffect(() => {

        importData()
        .then(({ postCodes, cases, population, tests }) => {
            return {
                postCodes: postCodes.default,
                cases: cases.default,
                population: population.default,
                tests: tests.default
            };
        })
        .then(({ postCodes, cases, population, tests }) => {

            const data = mergeData({ postCodes, cases, population, tests });

            const result = {
                ...data,
                setDate: (date) => {
                    setData({
                        ...result,
                        selectedDate: date
                    });
                }
            }

            setData(result);
        });

    }, [])

    return (
        <ContextProvider value={data}>
            {children}
        </ContextProvider>
    );
}
