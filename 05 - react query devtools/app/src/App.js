import React from 'react'
import { useQuery } from 'react-query'

// [1] & [2]
import { ReactQueryDevtools } from 'react-query-devtools'

import axios from 'axios'

function Pokemon() {
  const queryInfo = useQuery('pokemon', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return axios
      .get('https://pokeapi.co/api/v2/pokemon')
      .then(res => res.data.results)
  })

  return queryInfo.isLoading ? (
    'Loading...'
  ) : queryInfo.isError ? (
    queryInfo.error.message
  ) : (
    <div>
      {queryInfo.data.map(result => {
        return <div key={result.name}>{result.name}</div>
      })}
    </div>
  )
}

export default function App() {
  return (
    <div>
      <Pokemon />
      {/* [2] */}
      <ReactQueryDevtools />
    </div>
  )
}

// [NOTES]
// [1]
// npm i -D react-query-devtools
// --> development only
// [2]
// import { ReactQueryDevtools } from 'react-query-devtools'
// --> just a component
// --> put as high up in component tree as possible
