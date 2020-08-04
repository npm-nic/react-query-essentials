import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

export default function App() {
  const queryInfo = useQuery('pokemon', async () => {
    // [2]
    await new Promise(resolve => setTimeout(resolve, 1000))
    return axios
      .get('https://pokeapi.co/api/v2/pokemon')
      .then(res => res.data.results)
  })

  // [1]
  return queryInfo.isLoading ? (
    'Loading...'
  ) : (
      <div>
        {/* [3] */}
      {queryInfo.data.map(result => {
        return <div key={result.name}>{result.name}</div>
      })}
    </div>
  )
}

// [NOTES]
// [1] lots of things we can use on queryInfo
// --> queryInfo.isIdle
// --> queryInfo.isLoading // --> boolean
// --> queryInfo.isSuccess
// --> queryInfo.isError
// --> queryInfo.status = "idle" | "loading" | "success" | "error"
// [2] creating fake lag in server
// --> not needed if not demonstrating
// [3]
// --> no need for optional chaining 'data?.map'
// --> checking this in 'isLoading'
// --- --> confirming data is there when we are no longer fetching 
