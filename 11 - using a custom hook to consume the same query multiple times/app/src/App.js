import React from 'react'
import { useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'

import axios from 'axios'

export default function App() {
  return (
    <div>
      <Count />
      <Pokemon />
      <ReactQueryDevtools />
    </div>
  )
}

// [1]
function usePokemon() {
  return useQuery('pokemons', async () => {
    // [2]
    await new Promise(resolve => setTimeout(resolve, 1000))
    return axios
      .get('https://pokeapi.co/api/v2/pokemon')
      .then(res => res.data.results)
  })
}

function Count() {
  // [1]
  const queryInfo = usePokemon()

  return <h3>You are looking at {queryInfo.data?.length} pokemon</h3>
}

function Pokemon() {
  // [1]
  const queryInfo = usePokemon()

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

// [NOTES]
// automatically de-duplicates requests & usages of queries based on query key
// --> put this to good use ⤵️
// --> use same query key across app
// --> don't need to worry about
//      - multiple requests going out to server
//      - multiple versions of the data hanging around
// EVEN EASIER THAN CONTEXT
// --> all of context is handled behind th scenes (per query key)

// [1]
// --> custom hook component makes things cleaner
// --> can reuse across app
// --> don't have to worry about messing up 'pokemons' query key between the two

// [2]
// --> simulating delay in server
