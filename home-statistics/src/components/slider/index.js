import './slider.css'

import React, { useContext } from 'react';
import Slider from 'react-smooth-range-input';
import { DataContext } from 'components/data-context';

export const DateSlider = () => {

    const { dates, setDate } = useContext(DataContext);

    if(!dates) {
        return null;
    }

    const initialValue = dates.length - 1;

    return (
        <div className="slider">
            <Slider
            value={initialValue -1}
            min={0}
            max={initialValue}
            onChange={(value) => { setDate(dates[value]); } }
            customController={({ ref, value }) => (
                <div ref={ref} className="controller">
                    <label className="controller-label">{dates[value]}</label>
                </div>
                )}
            />
        </div>
    );
};
