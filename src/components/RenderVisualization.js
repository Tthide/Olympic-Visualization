import React from 'react'
import PieChart from './Visualizations/PieChart';
import Treemap from './Visualizations/Treemap';
import Choropleth from './Visualizations/Choropleth';
// Import other visualizations if needed


const RenderVisualization = ({VisualizationMode}) => {
    switch (VisualizationMode) {
        case 'PieChart':
            return <PieChart />;
        case 'Treemap':
            return <Treemap />;
        case 'Choropleth':
            return <Choropleth />;
        // Add more cases for other visualization components
        case "None":
            return <h2>Please select a visualization mode</h2>;
        default:
            return <h2>Please select a visualization mode</h2>;
    }
}


export default RenderVisualization;
