import React, { Component } from 'react'
import Navbar from './component/layout/Navbar'
import Users from './component/layout/users/Users'
import axios from 'axios'
import './App.css'
import Search from './component/layout/users/Search'

class App extends Component {
  state = {
    users: [],
    loading: false,
  }
  async componentDidMount() {
    const REACT_CLIENT_ID = 'ccd3a0c757c978538dd4'
    const REACT_CLIENT_KEY = '05579e08c00b61cae13f066d6b5dc818e8b71842'

    this.setState({ loading: true })
    const res = await axios.get(
      `https://api.github.com/users?client_id=${REACT_CLIENT_ID}&client_secret=${REACT_CLIENT_KEY}`
    )
    this.setState({ users: res.data, loading: false })
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Search />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    )
  }
}

export default App
