import React from 'react'

const VisualizationModeFilter = ({ handleChange }) => {
    return (
        <>
            <label for="dropdown-VisualizationMode">Choose a Visualization type:</label>
            <select name="dropdown" id="dropdown-VisualizationMode" onChange={(value) => handleChange('VisualizationMode', value)} >
                <option value="PieChart" >Pie chart</option>
                <option value="Treemap">Treemap</option>
                <option value="Choropleth">Choropleth</option>
            </select>
        </>
    )
}

export default VisualizationModeFilter