import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY

const CountryData = ({country}) => {
    // console.log(country)
    const [ weather, setWeather ] = useState([])
    

    const capital = country.capital.replace(" ", '%20')

    useEffect(() => {
        // console.log('Dentro de effect para climas')
        axios
            .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}&units=m`)
            .then(res => {
                setWeather(res.data.current)
            })    
    }, [capital])

    // console.log(weather)

    return (
        <div>
            <h2>{country.name}</h2>
            <div>
                Capital: {country.capital}
            </div>
            <div>
                Population: {country.population}
            </div>
            <h3>Lenguages</h3>
            <div>
                <ul>
                {country.languages.map(language =>{
                    return <li key={language.iso639_2}>{language.name}</li>
                })}
                </ul>
            </div>
            <div>
                <img className="flag" src={country.flag} alt={country.cioc}/>
            </div>
            <div>
                <h3>Weather in {country.capital}</h3>
                <div>
                    <strong>Temperature:</strong> {weather.temperature} °C
                </div>
                <div>
                    <img src={weather.weather_icons} alt={`Weather icon ${capital.replace("%20", " ")}`}></img>
                </div>
                <div>
                    <strong>Wind:</strong> {weather.wind_speed} Km/h, direction {weather.wind_dir}
                </div>
            </div>
        </div>
    )
}

export default CountryData