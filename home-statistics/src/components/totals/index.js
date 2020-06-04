import React, { useContext, useMemo, useState } from 'react';
import { DataContext } from 'components/data-context';
import { Selector } from 'components/selector';
import { AllSuburbs } from './all-suburbs';
import { BySuburb } from './by-suburb';
import { SuburbSuggest } from './suburb-suggest';

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

export const Totals = () => {

    const { cases, selectedDate, dates } = useContext(DataContext);
    const [ displayType, setDisplayType ] = useState(selectorData[0].key);
    const [ suburb, setSuburb ] = useState('');

    const data = useMemo(() =>
        [...cases.get(selectedDate).values()],
        [cases, selectedDate]
    );

    const suburbData = useMemo(() => {

        if(!suburb) {
            return [];
        }

        return dates
        .map(date => {
            const caseEntry = cases.get(date);

            if(!caseEntry) {
                return null;
            }

            return caseEntry.get(suburb)
        });
    }, [suburb, dates, cases]);

    const render = () => {

        if(displayType === selectorData[0].key) {
            return (<AllSuburbs data={data} isGrouped />);
        }

        if(displayType === selectorData[1].key) {
            return (<AllSuburbs data={data} />)
        }

        if(displayType === selectorData[2].key) {
            return (
            <>
                <SuburbSuggest onSuburbSelected={setSuburb} value={suburb} />
                <BySuburb data={suburbData} />
            </>);
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
