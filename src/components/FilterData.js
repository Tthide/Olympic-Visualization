
const FilterData = ({ dataset, currentFilters, dictionary }) => {

  const groupBy = currentFilters.GroupBy;

  const medalCounts = dataset.reduce((acc, entry) => {


    //translating IOC country code to country name
    // Find the corresponding country
    const country = dictionary.find(country => country.Code === entry.Country);

    // Extract the country name if the code was found
    const countryName = country ? country.Country : "Country not found";

    //checking filters
    if (((countryName === currentFilters.Country) || (currentFilters.Country === "All"))
      && (entry.Year >= currentFilters.TimePeriodStart)
      && (entry.Year <= currentFilters.TimePeriodEnd)
      && ((entry.Sport === currentFilters.Sport) || (currentFilters.Sport === "All"))
      && ((entry.Medal === currentFilters.Medal) || (currentFilters.Medal === "All"))) {


      //checking if this entry's value of the property we groupBy with has been encountered
      if (acc[entry[groupBy]]) {
        acc[entry[groupBy]] += 1;
      } else {
        acc[entry[groupBy]] = 1;
      }

    }




    return acc;
  }, {});



  return medalCounts;


}

export default FilterData