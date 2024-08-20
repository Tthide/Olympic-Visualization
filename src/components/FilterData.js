
const FilterData = ({dataset,currentFilters}) => {

//In all cases we group the data by country


const medalCounts = dataset.reduce((acc, entry) => {
  //current item's country
  const country = entry.Country;



  //checking if this country has been encoutered yet
  if (acc[country]) {
    acc[country] += 1;
  } else {
    acc[country] = 1;
  }
  
  return acc;
}, {});



  return medalCounts;
  

}

export default FilterData