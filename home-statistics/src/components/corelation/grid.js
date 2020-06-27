import React from 'react';

export const Grid = ({ children }) => (
    <div className="corelation">
        <div className="population h-header">Population</div>
        <div className="cases h-header">Total Cases</div>
        <div className="active h-header">Active</div>
        <div className="recovered h-header">Recovered</div>
        <div className="tests h-header">Tests</div>

        <div className="population v-header">Population</div>
        <div className="cases v-header">Total Cases</div>
        <div className="active v-header">Active</div>
        <div className="recovered v-header">Recovered</div>
        <div className="tests v-header">Tests</div>

        {children}
    </div>
)
