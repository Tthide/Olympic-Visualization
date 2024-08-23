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


    this.state = {

      //we won't disable date filtering, as it allows the user to 
      //reduce the number of items displayed when grouping by years (when it just shows the total if we do that with sports or countries)

      //by default we group by countries, therefore the country filter is disabled
      Country: false,
      Sport: false,
      Medal: false,

    }

  }



  handleChange = (Property, Value) => {
    //special case to handle the disabling of grouped by filters
    if (Property === "GroupBy") {

      console.log("*******************");

      console.log("property : " + Property);
      console.log("Value : " + Value);


      let updatedState = { ...this.state.copy };
      // Update the state based on the selected value
      Object.keys(this.state).forEach(key => {
        console.log("key : " +key)
        updatedState[key] = key === Value; // Set true for the selected key, false for others
      });
      this.setState(updatedState);
      console.log("*******************");
    }

    // Updating Visualization component's state
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

    //console.log(Object.keys(this.props.currentFilters));
    return (
      <div className='filters'>
        <h2>Child Component</h2>

        {/* VisualizationMode */}
        <DropdownFilter
          handleChange={this.handleChange}
          targetProperty="VisualizationMode"
          domainProperty={visualizationModeDomain}
          defaultValue="None"
          disabled={false} />

        {/* GroupBy */}
        <DropdownFilter
          handleChange={this.handleChange}
          targetProperty="GroupBy"
          domainProperty={Object.keys(this.props.currentFilters)}
          defaultValue="Country"
          disabled={false} />

        {/*DateFilter */}
        <DateFilter handleChange={this.handleChange} />

        {/* Country */}
        {/* Extracting here the country set from the dictionary*/}
        <DropdownFilter
          handleChange={this.handleChange}
          targetProperty="Country"
          domainProperty={[...new Set(dictionary.map(item => item.Country))]}
          defaultValue="All"
          disabled={this.state.Country} />

        {/* Sport */}
        <DropdownFilter
          handleChange={this.handleChange}
          targetProperty="Sport"
          domainProperty={[...new Set(summer.map(item => item.Sport))].sort()}
          defaultValue="All"
          disabled={this.state.Sport} />

        {/* MedalType */}
        <DropdownFilter
          handleChange={this.handleChange}
          targetProperty="Medal"
          domainProperty={["Gold", "Silver", "Bronze"]}
          defaultValue="All"
          disabled={this.state.Medal} />

      </div>
    );
  }
}
