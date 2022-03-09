import React, { useEffect, useState } from 'react'
import {useQuery, gql} from '@apollo/client'
import { LOAD_COUNTRIES } from '../GraphQL/Queries'

const GetCountries = () => {
    const {error, loading, data} = useQuery(LOAD_COUNTRIES)
    const [countries, setCountries] = useState([])

    useEffect(() => {
        if(data) {
            console.log('data: ', data.countries[0])
            setCountries(data.countries)
        }
    }, [data])

    return (
        <div>
            {countries.map((country:any) => {
                return <h1>{country.name} {country.code}</h1>
            })}
        </div>

            
    )
}

export default GetCountries