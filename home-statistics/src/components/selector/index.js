import './selector.css';
import React from 'react';

export const Selector = ({ data, selectedKey, setSelected, title }) => {

    const items = data
        .map(({ key, name}) => (
            <label
                key={key}
                className={`item${selectedKey === key ? ' selected' : ''}`}
            >
                <input type="radio" name="test" value={key}
                    checked={selectedKey === key}
                    onChange={() => { setSelected(key); }} />
                {name}
            </label>
        ));

    return (
        <div className="selector">
            <label className="item">
                {title}:
            </label>
            {items}
        </div>
    );
}
