import {gql} from '@apollo/client'

export const LOAD_COUNTRIES = gql`
    query {
        countries {
            name
            code
        }
    }
`