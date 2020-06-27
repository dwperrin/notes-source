import React, { useState } from 'react';
import {
    ScatterChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Scatter
} from 'recharts';
import { Grid } from './grid'
import { ChartSuggest } from './chart-suggest'
import { useResizePercent, useResize } from 'utils/hooks'

const Suggester = ({ selectedChart, selectChart }) =>
    <ChartSuggest value={selectedChart} onSuburbSelected={selectChart} />

const AllCharts = ({ plots }) => {
    const [widthByPercent] = useResizePercent(100 / 6);

    return (
        <Grid>
            {plots.map(({id, cell, isDiagonal, data, axis, color}) => {
                if(isDiagonal) {
                    return (<div key={id} className={cell}>&nbsp;</div>)
                }

                return (
                    <div key={id} className={cell}>
                        <ScatterChart width={widthByPercent} height={widthByPercent}
                            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="1 1" />
                            <XAxis dataKey={axis.keys[0]} name={axis.names[0]} unit="" />
                            <YAxis dataKey={axis.keys[1]} name={axis.names[1]} unit="" />
                            <Tooltip cursor={{ strokeDasharray: '1 1' }} />
                            <Scatter data={data} fill={color} />
                        </ScatterChart>
                    </div>
                );
            })}
        </Grid>
    )
}

const ChartByPair = ({ plots }) => {
    const [width] = useResize();
    const [ selectedChart, selectChart ] = useState('');

    const plot = plots.filter(item => item.cell === selectedChart)[0];

    return (
        <>
            <Suggester {...{selectedChart, selectChart}} />
            {plot && <ScatterChart width={width} height={500}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey={plot.axis.keys[0]} name={plot.axis.names[0]} unit="" />
                <YAxis dataKey={plot.axis.keys[1]} name={plot.axis.names[1]} unit="" />
                <Tooltip cursor={{ strokeDasharray: '1 1' }} />
                <Scatter data={plot.data} fill={plot.color} />
            </ScatterChart>}
        </>
    )
}

export const ScatterPlot = ({ plots, byName }) =>
    byName ? (<ChartByPair plots={plots} />) : (<AllCharts plots={plots} />)
