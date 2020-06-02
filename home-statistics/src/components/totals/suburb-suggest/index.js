import {} from './suburb-suggest.css';

import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

const languages = [
    {
      name: 'C',
      year: 1972
    },
    {
      name: 'Elm',
      year: 2012
    },
    {
        name: 'C#',
        year: 2012
    },
    {
        name: 'Haskell',
        year: 2012
    }
  ];

const getSuggestionValue = suggestion => suggestion.name;

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : languages.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

const renderSuggestion = suggestion => (
    <div>
      {suggestion.name}
    </div>
  );

export const SuburbSuggest = () => {

    const [value, setValue ] = useState('');
    const [ suggestions, setSuggestions ] = useState([]);

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(
            getSuggestions(value)
        );
      };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const onChange = (event, { newValue }) => {
        setValue(newValue);
    };

    const inputProps = {
        placeholder: 'Search suburb',
        value,
        onChange
    };

    return (
        <div style={{ display: "flex", 'justify-content': 'flex-end' }}>
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
