import React from 'react'

const DropdownFilter = ({ handleChange, targetProperty, domainProperty, defaultValue }) => {

    //Default label of dropdown box
    let label = "Choose a "+targetProperty;

    //GroupBy filter special case
    if (targetProperty === "GroupBy") {
        //we can't group by the following properties so we take them out of the domainProperty
        domainProperty = domainProperty.filter(e => e !== 'TimePeriodStart' && e !== 'TimePeriodEnd' && e !== 'VisualizationMode')
        domainProperty.push("Year");

        label = "Group the data by"

    }



    return (
        <div className="filter-dropdown">
            <label htmlFor={`dropdown-${targetProperty}`}>{label}: </label>
            <select name="dropdown" id={`dropdown-${targetProperty}`} onChange={(event) => handleChange(targetProperty, event.target.value)}>


                <option key="defaultValue" value={defaultValue}>{defaultValue}</option>

                {/*checking for no duplicates with defaultValue and targetProperty */}
                {domainProperty.filter(element => element !== defaultValue && element !== targetProperty).map(element => (
                    <option key={element} value={element}>{element}</option>
                ))}

            </select>
        </div>
    );
};

export default DropdownFilter;

