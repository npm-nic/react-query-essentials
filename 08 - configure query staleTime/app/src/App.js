import React from 'react'
import { useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'

import axios from 'axios'

function Pokemon() {
  const queryInfo = useQuery(
    'pokemon',
    async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return axios
        .get('https://pokeapi.co/api/v2/pokemon')
        .then(res => res.data.results)
    },
    {
      // [1]
      staleTime: Infinity,
    }
  )

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
// --> react-query very aggressive out of the box with stale time
// --> stale as soon as it resolves --> ready to be re-fetched on window focus
// -- (default) staleTime: 0
// WHAT? is stale time
// --> the amount of time before you think your data could be old (incorrect)
// --> automatically refetch when window is refocused
// what if we didn't want it to always refetch? 
// --> technically, we know the pokemon api will not be changing very often
// --> 

// [1]
// -- Infinity --> never becomes stale...EVER
