
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

      //getting all keys except the one we group by
      let { [groupBy]: removed, ...rest } = entry;

      // Ensure acc is initialized to an object
      if (!acc) acc = {};

      // Initialize or update the accumulator
      if (!acc[entry[groupBy]]) {
        acc[entry[groupBy]] = [];  // Initialize an array if it doesn't exist
      }

      acc[entry[groupBy]].push(rest);  // Add the rest of the entry to the array
    }




    return acc;
  }, {});

  return medalCounts;


}

export default FilterData