import React, { Component } from 'react'
import '../styles/Visualization.css';
import Filters from "./Filters"
import  RenderVisualization from './RenderVisualization';

class Visualization extends Component {
    constructor(props) {
        super(props);

        this.state = {//current visualization parameter
            VisualizationMode: "None",
            TimePeriodStart: 1896,
            TimePeriodEnd: 2020,
            Sport: "All",
            Medal: "All",
            Country: "All",
            GroupBy:"Country",

        };

        this.updateState = this.updateState.bind(this);

    }

    updateState = (property, newValue) => {
        let newState = { ...this.state };
        newState[property] = newValue;
        this.setState(newState);
    };

    render() {

        const stateEntries = [];
        Object.entries(this.state).forEach(([key, value]) => {
            stateEntries.push(

                <p> <strong>{key}:</strong> {value}</p>

            );
        });

        return (
            <div className="visualization">
                <div className="container-fluid">
                    <div class="row">
                        <div class="col-xs-12 col-md-4">
                            <Filters updateState={this.updateState} currentFilters={this.state} />

                            {stateEntries}
    
                        </div>
                        <div class="col-xs-12 col-md-8">
                            <RenderVisualization VisualizationMode={this.state.VisualizationMode} currentFilters={this.state}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Visualization;