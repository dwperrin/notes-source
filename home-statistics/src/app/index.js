import 'react-tabs/style/react-tabs.css';
import './app.css';

import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Map, Totals, Corelation, DataProvider, DateSlider } from 'components'

const App =() => (
    <DataProvider>
        <header>
            <h2>Statistical analysis while staying at home</h2>
        </header>
        <section role="main">
            <DateSlider />
            <Tabs>
                <TabList>
                    <Tab>Map</Tab>
                    <Tab>Totals</Tab>
                    <Tab>Correlation</Tab>
                </TabList>
                <TabPanel>
                    <Map />
                </TabPanel>
                <TabPanel>
                    <Totals />
                </TabPanel>
                <TabPanel>
                    <Corelation />
                </TabPanel>
            </Tabs>
        </section>
    </DataProvider>
);

export default App;
