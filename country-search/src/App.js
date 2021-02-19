import React, { useEffect, useState } from 'react'
import './App.css';
import Filter from 'components/Filter'
import Country from 'components/Country'
import CountryData from 'components/CountryData'
import axios from 'axios'


function App() {
  const [ countries, setCountries] = useState([])
  const [ filterValue, setFilter] = useState('')
  const [ filteredCountries, setFilteredCountries ] = useState([])

  useEffect(() => {
    // console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data)
      })

  },[])

  const handleFilter = (e) => {
    setFilter(e.target.value)
    const expresion = new RegExp(e.target.value.toLowerCase())
    // console.log(expresion)
    const filtered = countries.filter( country => {
      return country.name.replace(/\s/g, " ").toLowerCase().search(expresion) !== -1
    })
    // console.log(filtered)
    setFilteredCountries(filtered)
  }

  //  console.log(countries)
  // console.log(filteredCountries)
  

  return (
    <div>
      <h1>Countries</h1>
        
        <Filter 
          filterValue={filterValue}
          handleFilter={handleFilter}
        />
      
      <h3>Country</h3>
          { filteredCountries.length === 1
            ?  <CountryData country={filteredCountries[0]}/> 
            :  (filteredCountries.length > 0 

                  ?  (filteredCountries.length <= 10
                      ?  (filteredCountries.map(country => {
                            return <Country key={country.capital} country={country}/>}
                          ))
                        : <div>
                            Too many matches, specify another filter
                          </div> 
                        )
                  : <div>
                        No matches
                    </div> 
                )    
            }
    </div>
  );
}

export default App;
