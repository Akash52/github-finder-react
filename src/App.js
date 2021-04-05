import React, { Component } from 'react'
import Navbar from './component/layout/Navbar'
import Users from './component/layout/users/Users'
import axios from 'axios'
import './App.css'

class App extends Component {
  state = {
    users: [],
    loading: false,
  }
  async componentDidMount() {
    console.log(process.env.REACT_CLIENT_KEY)
    this.setState({ loading: true })
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_CLIENT_ID}&client_secret=${process.env.REACT_CLIENT_KEY}`
    )
    this.setState({ users: res.data, loading: false })
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    )
  }
}

export default App
