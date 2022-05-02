import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

export default function About() {
  // console.log(props)
  // const searchParams = props.location.search
  // console.log(searchParams)
  // const obj = new URLSearchParams(searchParams)
  // console.log(obj)
  // console.log(obj.get('name'))
  // const objName = obj.get('name')
  // const query = queryString.parse(searchParams)
  // console.log(this.query)
  // console.log(query)

  const { search } = useLocation()
  console.log(search)
  const query = queryString.parse(search)
  // console.log(query)
  return (
    <div>
      <h2>About</h2>
      {query.name && <p>name은 {query.name}입니다.</p>}
    </div>
  )
}
