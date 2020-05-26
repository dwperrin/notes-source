import React, { useContext } from 'react';
import { VictoryChart, VictoryHistogram, VictoryContainer } from 'victory';
import { DataContext } from 'components/data-context';


export const Histogram = () => {
    const { cases, selectedDate } = useContext(DataContext);

    if(!cases) {
        return null;
    }

    const data = [...cases.get(selectedDate).values()]
        .map(item => ({ x: item.Cases }))

    return (
        <div >
            <VictoryChart  height={400} width={400}
                containerComponent={<VictoryContainer responsive={false}/>}>
                <VictoryHistogram data={data}
                />
            </VictoryChart>
        </div>
    )
}
