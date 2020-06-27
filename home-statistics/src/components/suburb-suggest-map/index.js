import './suburb-suggest.css';

import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { token } from 'utils/map';

const suggestionTextField = 'place_name_en-AU';

const extractPostCode = suggestion => {
    if(Array.isArray(suggestion.place_type) &&
            suggestion.place_type.includes('postcode')) {
        return {
            result: true,
            value: suggestion.text
        };
    }

    if(Array.isArray(suggestion.context)) {

        const data = suggestion.context.filter(item => item.id.includes('postcode'))[0];
        if(data) {
            return {
                result: true,
                value: data.text
            };
        }
    }

    return {
        result: false,
    };
};

const getSuggestions = value =>
    fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?country=au&bbox=139.965%2C-38.03%2C155.258%2C-27.839&limit=200&language=en-AU&access_token=${token}`
    )
    .then(response => response.json())
    .then(data => data.features || []);

const renderSuggestion = suggestion => (
    <div>
      {suggestion[suggestionTextField]}
    </div>
  );

export const SuburbSuggest = ({ onSuburbSelected, value: initial }) => {

    const [value, setValue ] = useState(initial);
    const [ suggestions, setSuggestions ] = useState([]);

    const onSuggestionsFetchRequested = ({ value }) => {
        if(!value || value.length < 2) {
            return;
        }

        getSuggestions(value)
        .then(data => {
            data = data.filter(item => extractPostCode(item).result);

            if(data.length > 0) {
                setSuggestions(data);
            }
        })
        .catch(console.log);
      };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const onChange = (event, { newValue }) => {
        setValue(newValue);
    };

    const getSuggestionValue = suggestion => {
        const result = suggestion[suggestionTextField];

        if(!onSuburbSelected) {
            return result;
        }

        const postCode = extractPostCode(suggestion);

        if(postCode.result) {
            setTimeout(() => {
                onSuburbSelected(postCode.value);
            }, 0);
        }

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
