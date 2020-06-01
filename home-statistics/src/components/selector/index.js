import './selector.css';
import React, { useState } from 'react';

export const Selector = ({ data, title, notifySelected }) => {

    const [selectedKey, setSelectedKey] = useState(data[0].key);

    const items = data
        .map(({ key, name}) => (
            <label
                key={key}
                className={`item${selectedKey === key ? ' selected' : ''}`}
            >
                <input type="radio" name="test" value={key}
                    checked={selectedKey === key}
                    onChange={() => {
                        setSelectedKey(key);

                        setTimeout(() => {
                            notifySelected(key);
                        }, 0);
                    }} />
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
