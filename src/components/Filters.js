import React, { Component } from 'react'
import DropdownFilter from './DropdownFilter';
import DateFilter from './DateFilter';
import '../styles/Filters.css';
import VisualizationModeDomain from '../data/VisualizationModeDomain.json';



export default class Filters extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

  }
  handleChange = (Property, Value) => {
    let selectedValue = null;
    // From the onChange event from the <input> we get Objects
    //but from the react-slider we directly get the values
    if (typeof Value === 'object' && Value !== null) {
      selectedValue = Value.target.value;
    } else {
      selectedValue = Value;
    }
    this.props.updateState(Property, selectedValue);
  };


  render() {
 
    console.log('aaa'+VisualizationModeDomain);

    return (
      <div className='filters'>
        <h2>Child Component</h2>

        <DropdownFilter   handleChange={this.handleChange}   targetProperty="VisualizationMode"   domainProperty={VisualizationModeDomain} />

        <DateFilter handleChange={this.handleChange} />

      </div>
    );
  }
}
