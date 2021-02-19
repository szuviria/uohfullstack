import React, { useState } from 'react'
import CountryData from 'components/CountryData'

const Country = ({country}) => {
    // console.log(country)
    const [ show, setShow ] = useState(false)

    const handleClick = () => {
        setShow(!show)
    }

    return (
        <div>
            {country.name} <button key={country.cioc} onClick={handleClick}>Show</button>
            {show ? <CountryData key={country.name} country={country}/> : ''}
        </div>
        
    )
}

export default Country