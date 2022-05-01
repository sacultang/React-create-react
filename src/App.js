import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/profile/:id' component={Profile}></Route>
        <Route path='/profile' component={Profile}></Route>
        <Route path='/about' component={About}></Route>
        <Route path='/' exact component={Home}></Route>
        {/* Not Found */}
        <Route component={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
