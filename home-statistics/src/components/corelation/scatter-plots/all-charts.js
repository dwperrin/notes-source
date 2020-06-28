import React, { useMemo } from 'react';
import {
    ScatterChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Scatter,
    BarChart,
    Bar
} from 'recharts';
import { useResizePercent } from 'utils/hooks'
import { Grid } from '../grid'
const computeHistogram = require('compute-histogram')

const Histogram = ({ axis, data, width, color }) => {
    const histogram = useMemo(() =>
        computeHistogram(data.map(item => item[axis.keys[0]]))
            .map(item => ({ x: item[0], y: item[1] })),
        [data, axis])

    return (
        <BarChart
            width={width}
            height={width}
            data={histogram}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="1 1" />
            <YAxis />
            <XAxis dataKey="x" />
            <Tooltip
                labelFormatter={(value) => `Bin #${value}`}
                formatter={(value) => [value, 'Total'] } />
            <Bar dataKey="y" fill={color} />
        </BarChart>
    )
}

export const AllCharts = ({ plots }) => {
    const [widthByPercent] = useResizePercent(100 / 6);

    return (
        <Grid>
            {plots.map(({id, cell, isDiagonal, data, axis, color}) => {
                if(isDiagonal) {
                    return (<div key={id} className={cell}>
                        <Histogram
                            axis={axis}
                            data={data}
                            width={widthByPercent}
                            color={color}
                        />
                    </div>)
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
