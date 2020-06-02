import React from 'react';
import {
    AreaChart, Area, YAxis, XAxis, CartesianGrid, Tooltip
} from 'recharts';
import { useResize } from 'utils/hooks'

export const BySuburb = ({data}) => {

    const [width] = useResize();

    return (
        <AreaChart
            width={width}
            height={300}
            data={data}
            margin={{ top: 5, right: 130, left: 70, bottom: 5 }}>
            <defs>
                <linearGradient id="cases" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <XAxis dataKey="Date" />
            <YAxis />
            <CartesianGrid strokeDasharray="1 1" />
            <Tooltip />
            <Area
                type="monotone"
                dataKey="Cases"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#cases)" />
        </AreaChart>
    )
}
