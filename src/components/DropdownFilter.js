import React from 'react'

const DropdownFilter = ({ handleChange, targetProperty, domainProperty }) => {


    return (
        <div className="filter-dropdown">
            <label htmlFor={`dropdown-${targetProperty}`}>Choose a {targetProperty}:</label>
            <select name="dropdown" id={`dropdown-${targetProperty}`} onChange={(event) => handleChange(targetProperty, event.target.value)}>


                {domainProperty.map((element) =>
                (<option key={element} value={element}>{element}</option>
                ))
                }
            </select>
        </div>
    );
};

export default DropdownFilter;

