import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

export default function App() {
  const queryInfo = useQuery('pokemon', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))    // [1] 
    return axios
      .get('https://pokeapi.co/api/v2/pokemon')
      .then(res => res.data.results)
  })

  return queryInfo.isLoading ? (
    'Loading...'
  ) : queryInfo.isError ? ( // [2]
    queryInfo.error.message
  ) : (
    <div>
      {queryInfo.data.map(result => {
        return <div key={result.name}>{result.name}</div>
      })}
    </div>
  )
}

// [1] --> put this in to simulate errors from api
// if (true) {
//   throw new Error('Test error!')
// }
// [2] 
// --> conveniently handle error before trying to render
// --> w/o this, 'data.map' would throw an error 
// --- --> no longer optional chaining



// our component now handles all 3 main states
//  1. loading ...
//  2. error !!
//  3. success :)
