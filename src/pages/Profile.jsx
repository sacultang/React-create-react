import { useParams } from 'react-router-dom'
function Profile() {
  const parmas = useParams()
  console.log(parmas)
  // console.log(props)
  // const id = props.match.params.id
  // console.log(id, typeof id)
  return (
    <div>
      <h2>Profile 페이지 입니다.</h2>

      {parmas.id && <p>id 는 {parmas.id} 입니다</p>}
    </div>
  )
}
export default Profile
