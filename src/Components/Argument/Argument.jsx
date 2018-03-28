import React from 'react';
import PropTypes from 'prop-types';

import './Argument.scss';

const Arguments = ({ title, items, onInputChange }) => {

    const handleChange = (id) => {
        return (event) => {
            onInputChange(id, event.target.value);
        };
    };

    const itemsWithNew = [
        ...items,
        {
            id: Math.round(Math.random() * 10e6), // random id
            value: '',
        }
    ];


    return (
        <div className="arguments">
            {title && <header>{title}</header>}
            <ol>
                {
                    itemsWithNew.map(item => (
                        <li key={item.id}>
                            <input type="text" value={item.value} onChange={handleChange(item.id)}/>
                        </li>
                    ))
                }
            </ol>
        </div>
    );
};

Arguments.propTypes = {
    title: PropTypes.string,
    items: PropTypes.array.isRequired,
    onInputChange: PropTypes.func.isRequired,
};

Arguments.defaultProps = {
    title: '',
};

export default Arguments;
