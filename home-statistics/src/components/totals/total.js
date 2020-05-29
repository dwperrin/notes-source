import React from 'react';
import {
    BarChart, Bar, Brush, ReferenceLine, YAxis, XAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export const Totals = ({
    dataKey,
    data,
    barColor,
    getTooltipLabel,
    getLegendLabel
 }) => {
    const [width, setWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []);

    return (
        <div>
            <BarChart
                width={width}
                height={300}
                data={data}
                margin={{ top: 5, right: 130, left: 70, bottom: 5 }}>
                <CartesianGrid strokeDasharray="1 1" />
                <YAxis />
                <XAxis dataKey="name" />
                <Tooltip
                labelFormatter={getTooltipLabel} />
                <Legend
                    verticalAlign="top"
                    wrapperStyle={{ lineHeight: '50px' }}
                    formatter={getLegendLabel} />
                <ReferenceLine y={0} stroke="#000" />
                <Brush dataKey="name" height={30} stroke="#8884d8" />
                <Bar dataKey={dataKey} fill={barColor} />
            </BarChart>
        </div>
    )
}
