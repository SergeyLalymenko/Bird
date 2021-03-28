import MainTable from './components/MainTable/MainTable'
import User from './components/User/User'
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'
import './App.css'



function App() {
  return (
    <Router>
      <div className="main">
        <Switch>
          <Route path="/user/:id">
            <User/>
          </Route>
          <Route path="/main">
            <MainTable/>
          </Route>
          <Route path="*">
            <Redirect to="/main"></Redirect>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
