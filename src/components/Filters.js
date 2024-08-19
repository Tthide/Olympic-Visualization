import React, { Component } from 'react'

export default class Filters extends Component {

  handleChange = (Property, Value) => {
    // Call the parent method passed as a prop
    const selectedValue = Value.target.value;
    console.log(Property);
    console.log(selectedValue);
    this.props.updateState(Property, selectedValue);
  };

  render() {
    return (
      <div>
        <h2>Child Component</h2>

        <label for="dropdown-VisualizationMode">Choose a Visualization type:</label>
        <select name="dropdown" id="dropdown-VisualizationMode" onChange={(value) =>this.handleChange('VisualizationMode',value)} >
          <option value="PieChart" >Pie chart</option>
          <option value="Treemap">Treemap</option>
          <option value="Choropleth">Choropleth</option>
        </select>



      </div>
    );
  }
}
