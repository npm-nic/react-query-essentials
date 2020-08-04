import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

export default function App() {
  const queryInfo = useQuery('pokemon', () =>
    axios
      .get('https://pokeapi.co/api/v2/pokemon')
      // [1]
      .then(res => res.data.results)
  )
  // [1] console.log(queryInfo.data)

  return (
    <div>
      {/* [2] */}
      {queryInfo.data?.map(result => {
        return <div key={result.name}>{result.name}</div>
      })}
    </div>
  )
}

// [NOTES]
// [1]
// what we return will be in the data object of queryInfo
// --> 'queryInfo.data'
// [2]
// NOTE we are using data?. (below)
// --> make sure there is data to map over before we try to
// --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
