import React, { Component } from 'react'
import  VisualizationModeFilter  from './VisualizationModeFilter';
import  DateFilter  from './DateFilter';
import '../styles/Filters.css';



export default class Filters extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

  }


  handleChange = (Property, Value) => {
    // Call the parent method passed as a prop
    const selectedValue = Value.target.value;
    console.log(Property);
    console.log(selectedValue);
    this.props.updateState(Property, selectedValue);
  };

  render() {
    return (
      <div className='filters'>
        <h2>Child Component</h2>

        <VisualizationModeFilter handleChange={this.handleChange} />

        <DateFilter handleChange={this.handleChange} />

      </div>
    );
  }
}