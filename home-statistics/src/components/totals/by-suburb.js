import React from 'react';
import {
    AreaChart, Area, YAxis, XAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { useResize } from 'utils/hooks'
import { SuburbSuggest } from './suburb-suggest';

const dataKeys = Object.freeze({
    Cases : { key: 'Cases', fill: '#ff8080', legend: 'Total Cases' },
    Active: { key: 'Active', fill: '#e60000', legend: 'Active' },
    Recovered: { key: 'Recovered', fill: '#0a6624', legend: 'Recovered' },
    Tests: { key: 'Tests', fill: '#6189ba', legend: 'Total Tests' },
    RecentTests: { key: 'RecentTests', fill: '#6189ba', legend: 'Recent Tests' }
});

const legend = (key) => {
    const result = dataKeys[key];
    return result ? result.legend : key;
}

const tooltipLabel = (value) => `Date: ${value}`;
const tooltipValue = (value, name) => {
    const displayName = legend(name);
    return [value, displayName ];
}

export const BySuburb = ({data}) => {

    const [width] = useResize();

    return (
        <>
            <SuburbSuggest />
            <AreaChart
            width={width}
            height={300}
            data={data}
            margin={{ top: 5, right: 130, left: 70, bottom: 5 }}>
            <defs>
                <linearGradient id="cases" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={dataKeys.Cases.fill} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={dataKeys.Cases.fill} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="active" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={dataKeys.Active.fill} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={dataKeys.Active.fill} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="recovered" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={dataKeys.Recovered.fill} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={dataKeys.Recovered.fill} stopOpacity={0}/>
                </linearGradient>
            </defs>
            <XAxis dataKey="Date" />
            <YAxis />
            <CartesianGrid strokeDasharray="1 1" />
            <Tooltip
                labelFormatter={tooltipLabel}
                formatter={tooltipValue}
            />
            <Legend
                verticalAlign="top"
                wrapperStyle={{ lineHeight: '50px' }}
                formatter={legend}
            />
            <Area
                type="monotone"
                dataKey={dataKeys.Cases.key}
                stroke={dataKeys.Cases.fill}
                fillOpacity={1}
                fill="url(#cases)" />
            <Area
                type="monotone"
                dataKey={dataKeys.Active.key}
                stroke={dataKeys.Active.fill}
                fillOpacity={1}
                fill="url(#active)" />
            <Area
                type="monotone"
                dataKey={dataKeys.Recovered.key}
                stroke={dataKeys.Recovered.fill}
                fillOpacity={1}
                fill="url(#recovered)" />
        </AreaChart>
        <AreaChart
            width={width}
            height={300}
            data={data}
            margin={{ top: 5, right: 130, left: 70, bottom: 5 }}>
            <defs>
                <linearGradient id="tests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={dataKeys.Tests.fill} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={dataKeys.Tests.fill} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="recentTests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={dataKeys.RecentTests.fill} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={dataKeys.RecentTests.fill} stopOpacity={0}/>
                </linearGradient>
            </defs>
            <XAxis dataKey="Date" />
            <YAxis />
            <CartesianGrid strokeDasharray="1 1" />
            <Tooltip
                labelFormatter={tooltipLabel}
                formatter={tooltipValue}
            />
            <Legend
                verticalAlign="top"
                wrapperStyle={{ lineHeight: '50px' }}
                formatter={legend}
            />
            <Area
                type="monotone"
                dataKey={dataKeys.Tests.key}
                stroke={dataKeys.Tests.fill}
                fillOpacity={1}
                fill="url(#tests)" />
            <Area
                type="monotone"
                dataKey={dataKeys.RecentTests.key}
                stroke={dataKeys.RecentTests.fill}
                fillOpacity={1}
                fill="url(#recentTests)" />
            </AreaChart>
        </>
    )
}
