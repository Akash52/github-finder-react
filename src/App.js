import React, { Fragment, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './component/layout/Navbar'
import Users from './component/layout/users/Users'
import User from './component/layout/users/User'
import axios from 'axios'
import './App.css'
import Search from './component/layout/users/Search'
import Alert from './component/layout/Alert'
import About from './component/pages/About'

let REACT_CLIENT_ID = 'ccd3a0c757c978538dd4'
let REACT_CLIENT_KEY = '05579e08c00b61cae13f066d6b5dc818e8b71842'
const App = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  // async componentDidMount() {
  //   const REACT_CLIENT_ID = 'ccd3a0c757c978538dd4'
  //   const REACT_CLIENT_KEY = '05579e08c00b61cae13f066d6b5dc818e8b71842'

  //   this.setState({ loading: true })
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${REACT_CLIENT_ID}&client_secret=${REACT_CLIENT_KEY}`
  //   )
  //   this.setState({ users: res.data, loading: false })
  // }
  //Search  Github Users
  const searchUsers = async (text) => {
    setLoading(true)

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${REACT_CLIENT_ID}&client_secret=${REACT_CLIENT_KEY}`
    )
    setUsers(res.data.items)
    setLoading(false)
  }

  // Get single Github user

  const getUser = async (username) => {
    setLoading(true)

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${REACT_CLIENT_ID}&client_secret=${REACT_CLIENT_KEY}`
    )
    setUser(res.data)
    setLoading(false)
  }

  // Get users Repos

  const getUserRepos = async (username) => {
    setLoading(true)

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${REACT_CLIENT_ID}&client_secret=${REACT_CLIENT_KEY}`
    )
    setRepos(res.data)
    setLoading(false)
  }

  // Clear USER from state
  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  }

  // Set Alert

  const showAlert = (msg, type) => {
    setAlert({ msg: msg, type: type })
    setTimeout(() => setAlert(null), 3000)
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/user/:login"
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  repos={repos}
                  user={user}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
