import React from 'react';
import { Map, DataProvider, DateSlider, Histogram } from 'components';

const App =() => (
    <DataProvider>
        <header>
            <h2>Statistical analysis while staying at home</h2>
        </header>
        <section>
            <Map />
            <DateSlider />
            <Histogram />
        </section>
    </DataProvider>
);

export default App;
