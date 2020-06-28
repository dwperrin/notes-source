import './suburb-suggest.css';

import React, { useState, useContext } from 'react';
import Autosuggest from 'react-autosuggest';
import { DataContext } from 'components'

const renderSuggestion = suggestion => (
    <div className="suggestion-item">
        <strong>{suggestion.postCode}</strong>
        <br/>
        <div>
            <span className="suburb-short">{suggestion.name.substring(0, 40)}</span>
            <span className="suburb-long" >{suggestion.name.substring(40)}</span>
        </div>
    </div>
);

export const SuburbSuggest = ({ onSuburbSelected, value: initial }) => {

    const [value, setValue ] = useState(initial);
    const [ suggestions, setSuggestions ] = useState([]);
    const { suburbs } = useContext(DataContext);

    const getSuggestions = value =>
        suburbs.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            item.postCode.includes(value))
        .slice(0, 5);

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
        const result = `${suggestion.postCode} ${suggestion.name}`;

        if(!onSuburbSelected) {
            return result;
        }

        setTimeout(() => {
            onSuburbSelected(suggestion.postCode);
        }, 0);

        return result;
    };

    const inputProps = {
        placeholder: 'Search suburb',
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
