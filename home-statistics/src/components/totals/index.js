import React, { useContext, useMemo, useState } from 'react';
import { DataContext, Selector, SuburbSuggest } from 'components';
import { AllSuburbs } from './all-suburbs';
import { BySuburb } from './by-suburb';

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
    const [ postCode, setPostCode ] = useState('');

    const data = useMemo(() =>
        [...cases.get(selectedDate).values()],
        [cases, selectedDate]
    );

    const suburbData = useMemo(() => {

        if(!postCode) {
            return [];
        }

        return dates
        .map(date => {
            const caseEntry = cases.get(date);

            if(!caseEntry) {
                return null;
            }

            return caseEntry.get(postCode)
        });
    }, [postCode, dates, cases]);

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
                <SuburbSuggest onSuburbSelected={setPostCode} value={postCode} />
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
