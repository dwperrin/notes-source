import React, { createContext, useEffect, useState } from 'react';
import { mergeData } from 'data-services'

export const DataContext = createContext({});

export const DataConsumer = DataContext.Consumer;

const ContextProvider = DataContext.Provider;

export const DataProvider = ({ children }) => {

    const [data, setData] = useState({});

    useEffect(() => {

        Promise.all([
            fetch('/data/post-codes.json').then(response => response.json()),
            fetch('/data/cases.json').then(response => response.json()),
            fetch('/data/population.json').then(response => response.json()),
            fetch('/data/tests.json').then(response => response.json())
        ])
        .then(([postCodes, cases, population, tests]) => {
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
