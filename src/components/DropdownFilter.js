import React, { useState, useEffect } from 'react';

const DropdownFilter = ({ handleChange, targetProperty, domainProperty, defaultValue, disabled }) => {
    // State to manage the selected value of the dropdown
    const [selectedValue, setSelectedValue] = useState(defaultValue);

    // Effect to update the selectedValue to the defaultValue when the disabled prop changes (defaultValue will never change)
    useEffect(() => {
        setSelectedValue(defaultValue);
    }, [defaultValue, disabled]);


    // Notify parent component when selectedValue changes
    // so that whenever the selectedValue changes, by choosing another option or by grouping by this parameter,
    // both Filters and Visualization's states are updated.
    useEffect(() => {
        handleChange(targetProperty, selectedValue); 
    }, [selectedValue, handleChange, targetProperty]); //(handleChange & targetProperty should not change)

    // Default label of dropdown box
    let label = "Choose a " + targetProperty;

    // GroupBy filter special case
    if (targetProperty === "GroupBy") {
        // Filter out certain properties and add "Year"
        domainProperty = domainProperty.filter(e => e !== 'TimePeriodStart' && e !== 'TimePeriodEnd' && e !== 'VisualizationMode');
        domainProperty.push("Year");
        label = "Group the data by";
    }

    return (
        <div className="filter-dropdown">
            <p>{selectedValue}</p>
            <label htmlFor={`dropdown-${targetProperty}`}>{label}: </label>
            <select
                name="dropdown"
                id={`dropdown-${targetProperty}`}
                onChange={(event) => {
                    const value = event.target.value;
                    setSelectedValue(value); // Update the state
                }}
                value={selectedValue} // Controlled component
                disabled={disabled}
            >
                <option key="defaultValue" value={defaultValue}>{defaultValue}</option>
                {/* Checking for no duplicates with defaultValue and targetProperty */}
                {domainProperty.filter(element => element !== defaultValue && element !== targetProperty).map(element => (
                    <option key={element} value={element}>{element}</option>
                ))}
            </select>
        </div>
    );
};

export default DropdownFilter;
