import React, { Component } from 'react'
import '../styles/Visualization.css';
import Filters from "./Filters"

class Visualization extends Component {
    constructor(props) {
        super(props);

        this.state = {//current visualization parameter
            VisualizationMode: "None",
            TimePeriodStart: 1896,
            TimePeriodEnd: 2020,
            Sport: "All",
            MedalType: "All",
            Country: "All",
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
                        <div class="col-2">
                            <Filters updateState={this.updateState} />

                            <h2>Current state</h2>

                            {stateEntries}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Visualization;