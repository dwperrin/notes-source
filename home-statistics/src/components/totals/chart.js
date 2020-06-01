import React from 'react';
import {
    BarChart, Brush, ReferenceLine, YAxis, XAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export const Totals = ({
    getBars,
    data,
    xAxisDataKey,
    getTooltipLabel,
    getTooltipValue,
    getLegendLabel
 }) => {
    const [width, setWidth] = React.useState(window.innerWidth- 50);

    React.useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth - 50));
    }, []);

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
