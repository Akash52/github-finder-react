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
    const REACT_CLIENT_ID = 'ccd3a0c757c978538dd4'
    const REACT_CLIENT_KEY = '05579e08c00b61cae13f066d6b5dc818e8b71842'
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${REACT_CLIENT_ID}&client_secret=${REACT_CLIENT_KEY}`
    )
    this.setState({ users: res.data.items, loading: false })
  }

  // Clear USER from state
  clearUsers = () => {
    this.setState({ users: [], loading: false })
  }

  render() {
    const { users, loading } = this.state
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    )
  }
}

export default App
