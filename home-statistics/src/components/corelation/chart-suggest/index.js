import './chart-suggest.css';

import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

const renderSuggestion = suggestion => (
    <div className="suggestion-item">
        <strong>{suggestion.name}</strong>
    </div>
);

const charts = [
    { name: 'Population', value: 'population-population' },
    { name: 'Population Cases', value: 'population-cases' },
    { name: 'Population Active', value: 'population-active' },
    { name: 'Population Recovered', value: 'population-recovered' },
    { name: 'Population Tests', value: 'population-tests' },
    { name: 'Cases Population', value: 'cases-population' },
    { name: 'Cases', value: 'cases-cases' },
    { name: 'Cases Active', value: 'cases-active' },
    { name: 'Cases Recovered', value: 'cases-recovered' },
    { name: 'Cases Tests', value: 'cases-tests' },
    { name: 'Active Population', value: 'active-population' },
    { name: 'Active Cases', value: 'active-cases' },
    { name: 'Active', value: 'active-active' },
    { name: 'Active Recovered', value: 'active-recovered' },
    { name: 'Active Tests', value: 'active-tests' },
    { name: 'Recovered Population', value: 'recovered-population' },
    { name: 'Recovered Cases', value: 'recovered-cases' },
    { name: 'Recovered Active', value: 'recovered-active' },
    { name: 'Recovered', value: 'recovered-recovered' },
    { name: 'Recovered Tests', value: 'recovered-tests' },
    { name: 'Tests Population', value: 'tests-population' },
    { name: 'Tests Cases', value: 'tests-cases' },
    { name: 'Tests Active', value: 'tests-active' },
    { name: 'Tests Recovered', value: 'tests-recovered' },
    { name: 'Tests', value: 'tests-tests' }
];

export const ChartSuggest = ({ onSuburbSelected, value: initial }) => {

    const initialSuggestion = charts.filter(item => item.value === initial)[0];

    const [value, setValue ] = useState(initialSuggestion?.value || '');
    const [ suggestions, setSuggestions ] = useState([]);

    const getSuggestions = value =>
        charts.filter(item =>
                item.name.toLowerCase().includes(value))
            .slice(0, 10);

    const onSuggestionsFetchRequested = ({ value }) => {
        if(!value || value.length < 2) {
            return;
        }

        const data = getSuggestions(value);

        if(data.length > 0) {
            setSuggestions(data);
        }
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const onChange = (event, { newValue }) => {
        setValue(newValue);
    };

    const getSuggestionValue = suggestion => {
        const result = suggestion;

        if(onSuburbSelected) {
            setTimeout(() => {
                onSuburbSelected(result.value);
            }, 0);
        }

        return result.name;
    };

    const inputProps = {
        placeholder: 'Search chart type',
        value,
        onChange
    };

    return (
        <div className="suburb-suggest">
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
        </div>
    );
}
