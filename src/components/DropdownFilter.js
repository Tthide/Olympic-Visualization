import React from 'react'

const DropdownFilter = ({ handleChange, targetProperty, domainProperty, defaultValue }) => {


    return (
        <div className="filter-dropdown">
            <label htmlFor={`dropdown-${targetProperty}`}>Choose a {targetProperty}:</label>
            <select name="dropdown" id={`dropdown-${targetProperty}`} onChange={(event) => handleChange(targetProperty, event.target.value)}>


                <option key="defaultValue" value={defaultValue}>{defaultValue}</option>

                {domainProperty.map((element) =>
                (<option key={element} value={element}>{element}</option>
                ))
                }
            </select>
        </div>
    );
};

export default DropdownFilter;

