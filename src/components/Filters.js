import React, { Component } from 'react'
import DropdownFilter from './DropdownFilter';
import DateFilter from './DateFilter';
import '../styles/Filters.css';
import visualizationModeDomain from '../data/visualizationModeDomain.json';
import dictionary from '../data/dictionary.json';
import summer from '../data/summer.json';



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

    return (
      <div className='filters'>
        <h2>Child Component</h2>

        {/* VisualizationMode */}
        <DropdownFilter handleChange={this.handleChange} targetProperty="VisualizationMode" domainProperty={visualizationModeDomain} defaultValue="None" />

        <DateFilter handleChange={this.handleChange} />

        {/* Country */}
        {/* Extracting here the country set from the dictionary*/}
        <DropdownFilter handleChange={this.handleChange} targetProperty="Country" domainProperty={[...new Set(dictionary.map(item => item.Country))]} defaultValue="All" />

        {/* Discipline */}
        <DropdownFilter handleChange={this.handleChange} targetProperty="Sport" domainProperty={[...new Set(summer.map(item => item.Sport))].sort()} defaultValue="All" />

        {/* MedalType */}
        <DropdownFilter handleChange={this.handleChange} targetProperty="MedalType" domainProperty={["Gold","Silver","Bronze"]} defaultValue="All" />

      </div>
    );
  }
}
