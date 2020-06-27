import React from 'react';
import { sampleCorrelation } from 'simple-statistics';
import { Grid } from './grid'

export const Numbers = ({ plots }) => (
    <Grid>
        {plots.map(({id, cell, isDiagonal, data, axis }) => {
            if(isDiagonal) {
                return (
                    <div key={id} className={cell}>
                        <span className="number-box">1</span>
                    </div>
                )
            }

            const value = sampleCorrelation(
                data.map(item => item[axis.keys[0]]),
                data.map(item => item[axis.keys[1]])
            ).toFixed(5)

            return (
                <div key={id} className={cell}>
                    <span className="number-box">
                        {value}
                    </span>
                </div>
            );
        })}
    </Grid>
)
