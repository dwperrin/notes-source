import React from 'react';
import {
    BarChart, Bar, Brush, ReferenceLine, YAxis, XAxis,
    CartesianGrid, Tooltip, Legend
} from 'recharts';
import { useResize } from 'utils/hooks';

const AllSuburbsBarChart = ({
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

const dataKeys = Object.freeze({
    'Cases' : { id: 1, fill: '#ff8080', legend: 'Total Cases' },
    'Active': { id: 2, fill: '#e60000', legend: 'Active' },
    'Recovered': { id: 3, fill: '#0a6624', legend: 'Recovered' },
    'Tests': { id: 4, fill: '#6189ba', legend: 'Total Tests' },
    'RecentTests': { id: 5, fill: '#6189ba', legend: 'Recent Tests' }
});

const legend = (key) => {
    const result = dataKeys[key];
    return result ? result.legend : key;
}

const tooltipLabel = (value) => `Postal Code: ${value}`;
const tooltipValue = (value, name) => {
    const displayName = legend(name);
    return [value, displayName ];
}

const renderGroup = (data) => (
    <AllSuburbsBarChart
        getBars={() => Object.entries(dataKeys)
            .map(([key, item]) =>
                <Bar
                    key={item.id}
                    dataKey={key}
                    fill={item.fill}
                />
            )
        }
        data={data}
        xAxisDataKey="POA_NAME16"
        getTooltipLabel={tooltipLabel}
        getTooltipValue={tooltipValue}
        getLegendLabel={legend}
    />
);

const renderIndividual = (data) =>
    Object.entries(dataKeys)
    .map(([key, item]) =>
        <AllSuburbsBarChart
            key={item.id}
            getBars={() => <Bar dataKey={key} fill={item.fill} />}
            data={data}
            xAxisDataKey="POA_NAME16"
            getTooltipLabel={tooltipLabel}
            getTooltipValue={tooltipValue}
            getLegendLabel={legend}
    />
);

export const AllSuburbs = ({ isGrouped, data }) => {
    return isGrouped ? renderGroup(data) : renderIndividual(data);
};
