import React, { Component, Fragment } from 'react'
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
class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  }
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
  searchUsers = async (text) => {
    this.setState({ loading: true })

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${REACT_CLIENT_ID}&client_secret=${REACT_CLIENT_KEY}`
    )
    this.setState({ users: res.data.items, loading: false })
  }

  // Get single Github user

  getUser = async (username) => {
    this.setState({ loading: true })

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${REACT_CLIENT_ID}&client_secret=${REACT_CLIENT_KEY}`
    )
    this.setState({ user: res.data, loading: false })
  }

  // Get users Repos

  getUserRepos = async (username) => {
    this.setState({ loading: true })

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${REACT_CLIENT_ID}&client_secret=${REACT_CLIENT_KEY}`
    )
    this.setState({ repos: res.data, loading: false })
  }

  // Clear USER from state
  clearUsers = () => {
    this.setState({ users: [], loading: false })
  }

  // Set Alert

  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } })
    setTimeout(() => this.setState({ alert: null }), 3000)
  }

  render() {
    const { users, loading, user, repos } = this.state
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
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
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
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
}

export default App
