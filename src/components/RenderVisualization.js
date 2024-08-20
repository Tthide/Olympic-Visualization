import React from 'react'
import PieChart from './Visualizations/PieChart';
import Treemap from './Visualizations/Treemap';
import Choropleth from './Visualizations/Choropleth';
// Import other visualizations if needed
import summer from '../data/summer.json';
import FilterData from './FilterData';


const RenderVisualization = ({ VisualizationMode, currentFilters }) => {


    if (VisualizationMode !== "None") {


        const Data = FilterData({ dataset: summer, currentFilters });
        console.log(Data);
        switch (VisualizationMode) {
            case 'PieChart':
                return <PieChart data={Data} />;
            case 'Treemap':
                return <Treemap />;
            case 'Choropleth':
                return <Choropleth />;
            // Add more cases for other visualization components
            default:
                return <h2>Please select a visualization mode</h2>;
        }

    }else{

        return <h2>Please select a visualization mode</h2>;

    }

}


export default RenderVisualization;