import { NavLink } from 'react-router-dom'

// const activeStyle = { color: 'green' }
// const notActive = { color: 'red' }
export default function NavLinks() {
  return (
    <ul>
      <li>
        <NavLink
          to='/'
          style={(isActive) => ({
            color: isActive ? 'green' : 'red',
          })}
        >
          Home
        </NavLink>
        {/* </li>
        <li>
          <NavLink to='/profile' activeStyle={activestyle}>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to='/profile/1' activeStyle={activestyle}>
            Profile/1
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/about'
            activeStyle={activestyle}
            isActive={(match, location) => {
              console.log(match)
              return location.search === '' && match !== null
            }}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/about?name=mark'
            activeStyle={activestyle}
            isActive={(match, location) => {
              return location.search === '?name=mark' && match !== null
            }}
          >
            About?name=mark
          </NavLink> */}
      </li>
    </ul>
  )
}
