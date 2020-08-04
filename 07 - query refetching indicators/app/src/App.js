import React from 'react'
import { useQuery } from 'react-query'
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
          <br />
        // [1]
      {queryInfo.isFetching ? 'Updating...' : null}
    </div>
  )
}

export default function App() {
  return (
    <div>
      <Pokemon />
      <ReactQueryDevtools />
    </div>
  )
}


// [NOTES]
// [1]
// --> very easily show we refetch in background 