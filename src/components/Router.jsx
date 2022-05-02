import Home from '../pages/Home'
import Profile from '../pages/Profile'
import About from '../pages/About'
import NotFound from '../pages/NotFound'
import { Route, Switch } from 'react-router-dom'
export default function Router() {
  return (
    <>
      <Switch>
        <Route path='/profile/:id' component={Profile}></Route>
        <Route path='/profile' component={Profile}></Route>
        <Route path='/about' component={About}></Route>
        <Route path='/' exact component={Home}></Route>
        {/* Not Found */}
        <Route component={NotFound}></Route>
      </Switch>
    </>
  )
}
