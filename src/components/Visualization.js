import React, { Component } from 'react'
import '../styles/Visualization.css';

class Visualization extends Component {
    constructor(props) {
        super(props);

        this.state = {//current visualization parameter
            VisualizationMode: "PieChart",
            TimePeriodStart: 1896,
            TimePeriodEnd: 2021,
            Discipline: "all",
            MedalType: "all",
            Country:"all",
        };
    }

    render() {
        return (
            <div className="visualization">
                <div className="container-fluid">
                    <div class="row">
                        <div class="col-12">

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Visualization;