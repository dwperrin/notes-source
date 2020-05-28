import React, { useContext, useMemo } from 'react';
import { DataContext } from 'components/data-context';
import {
    BarChart, Bar, Brush, ReferenceLine, YAxis, XAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export const Totals = () => {
    const { cases, selectedDate } = useContext(DataContext);
    const [width, setWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []);

    const data = useMemo(() =>
        [...cases.get(selectedDate).values()]
        .map(item => ({ 'Total Cases': item.Cases, name: item.POA_NAME16}))
        .filter(item => item.name)
    , [cases, selectedDate]);

    if(!cases) {
        return null;
    }

    return (
        <div>
            <BarChart
                width={width}
                height={300}
                data={data}
                margin={{ top: 5, right: 130, left: 70, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis />
                <XAxis dataKey="name" />
                <Tooltip
                labelFormatter={(value) => `Postal Code: ${value}`} />
                <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '50px' }} />
                <ReferenceLine y={0} stroke="#000" />
                <Brush dataKey="name" height={30} stroke="#8884d8" />
                <Bar dataKey="Total Cases" fill="#ff8080" />
            </BarChart>
        </div>
    )
}
