import 'react-tabs/style/react-tabs.css';
import './app.css';

import React from 'react';
import { Map, DataProvider, DateSlider } from 'components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Totals } from 'components/totals'

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
                </TabList>
                <TabPanel>
                    <Map />
                </TabPanel>
                <TabPanel>
                    <Totals />
                </TabPanel>
            </Tabs>
        </section>
    </DataProvider>
);

export default App;
