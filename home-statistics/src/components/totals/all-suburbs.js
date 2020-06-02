import React from 'react';
import {
    BarChart, Brush, ReferenceLine, YAxis, XAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { useResize } from 'utils/hooks';

export const AllSuburbs = ({
    getBars,
    data,
    xAxisDataKey,
    getTooltipLabel,
    getTooltipValue,
    getLegendLabel
 }) => {
    const [width] = useResize();

    return (
        <BarChart
            width={width}
            height={300}
            data={data}
            margin={{ top: 5, right: 130, left: 70, bottom: 5 }}>
            <CartesianGrid strokeDasharray="1 1" />
            <YAxis />
            <XAxis dataKey={xAxisDataKey} />
            <Tooltip
                labelFormatter={getTooltipLabel}
                formatter={getTooltipValue}
            />
            <Legend
                verticalAlign="top"
                wrapperStyle={{ lineHeight: '50px' }}
                formatter={getLegendLabel} />
            <ReferenceLine y={0} stroke="#000" />
            <Brush dataKey="name" height={30} stroke="#8884d8" />
            {getBars()}
        </BarChart>
    )
}
