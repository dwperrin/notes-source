import React from 'react';
import { AllCharts } from './all-charts'
import { ChartByPair } from './by-pair'

export const ScatterPlot = ({ plots, byName }) =>
    byName ?
    (<ChartByPair plots={plots} />) :
    (<AllCharts plots={plots} />)
