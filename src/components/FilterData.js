
const FilterData = ({ dataset, currentFilters }) => {

  //In all cases we group the data by country


  const medalCounts = dataset.reduce((acc, entry) => {
    //current item's country
    const country = entry.Country;


    console.log("entry medal type"+entry.MedalType);
    console.log("filter medal type"+currentFilters.MedalType);
    console.log(entry.MedalType === currentFilters.MedalType);
    if (currentFilters.Country === "All") {

      //checking filters
      if ((entry.Year >= currentFilters.TimePeriodStart)
        && (entry.Year <= currentFilters.TimePeriodEnd)
        && ((entry.Sport === currentFilters.Sport) || (currentFilters.Sport === "All"))
        && ((entry.Medal === currentFilters.Medal) || (currentFilters.Medal === "All")) ) {


        //checking if this country has been encoutered yet
        if (acc[country]) {
          acc[country] += 1;
        } else {
          acc[country] = 1;
        }

      }

    }


    return acc;
  }, {});



  return medalCounts;


}

export default FilterData