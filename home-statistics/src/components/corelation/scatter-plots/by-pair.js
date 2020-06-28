import React, { useState, useMemo } from 'react';
import {
    ScatterChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Scatter,
    BarChart,
    Bar
} from 'recharts';
import { ChartSuggest } from '../chart-suggest'
import { useResize } from 'utils/hooks'
const computeHistogram = require('compute-histogram')

const Suggester = ({ selectedChart, selectChart }) =>
    <ChartSuggest value={selectedChart} onSuburbSelected={selectChart} />

const Histogram = ({ plot, width }) => {
    const histogram = useMemo(() =>
        computeHistogram(plot.data.map(item => item[plot.axis.keys[0]]))
            .map(item => ({ x: item[0], y: item[1] })),
        [plot])

    return (
        <BarChart
            width={width}
            height={500}
            data={histogram}
            margin={{ top: 5, right: 130, left: 70, bottom: 5 }}>
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="x" />
            <Tooltip
                labelFormatter={(value) => `Bin #${value}`}
                formatter={(value) => [value, 'Total'] } />
            <Legend
                verticalAlign="top"
                wrapperStyle={{ lineHeight: '50px' }}
                formatter={() => `${plot.axis.names[0]} - Histogram`}
            />
            <Bar dataKey="y" fill={plot.color} />
        </BarChart>
    )
}


const ScatterPlot = ({ plot, width }) => (
    <ScatterChart width={width} height={500}
        margin={{ top: 5, right: 130, left: 70, bottom: 5 }}>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey={plot.axis.keys[0]} name={plot.axis.names[0]} unit="" />
        <YAxis dataKey={plot.axis.keys[1]} name={plot.axis.names[1]} unit="" />
        <Tooltip cursor={{ strokeDasharray: '1 1' }} />
        <Scatter data={plot.data} fill={plot.color} />
    </ScatterChart>
)

export const ChartByPair = ({ plots }) => {
    const [width] = useResize();
    const [ selectedChart, selectChart ] = useState('');

    const plot = useMemo(() => plots.filter(item => item.cell === selectedChart)[0],
        [selectedChart, plots]);

    const renderBody = (plot) =>
        plot.isDiagonal ?
            (<Histogram {...{ plot, width }} />) :
            (<ScatterPlot {...{ plot, width }} />)

    return (
        <>
            <Suggester {...{selectedChart, selectChart}} />
            {plot && renderBody(plot)}
        </>
    )
}
