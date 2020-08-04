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
      cacheTime: Infinity,
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
  const [show, toggle] = React.useReducer(d => !d, true)
  return (
    <div>
      <button onClick={() => toggle()}>{show ? 'Hide' : 'Show'}</button>
      <br />
      <br />
      {show ? <Pokemon /> : null}
      <ReactQueryDevtools />
    </div>
  )
}

// [NOTES]
// inactive state
// --> queryInfo is no longer in use, but we still have it in memory
// (default) cacheTime: 5*50*1000
// --> (5 minutes)
// --> this is fine because typically after 5 minutes we would want to refetch the data anyway
// when we need that data again...
// --> show cached data (IMMEDIATELY)
// --> refetch (background)
// --> update (if necessary)
// [1]
// --> lower cacheTimes will show hard loading state more often
// --> cant load data synchronously from memory cache
// cacheTime: 0 --> always refetch b/c we delete it from cache immediately
// cacheTime: infinity --> never refetch b/c we never delete it, even when it is not in use
