import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'

class App extends React.Component {
  state ={
    username: '',
    name: ''
  }

  componentDidMount(){
    axios.get('https://api.github.com/users/dstemple7')
    .then(res => {
      this.setState({
        username: res.data.login,
        name: res.data.name
      })
    })
  }

  handleChanges = e => {
    this.setState({
      username: e.target.value
    })
  }

  fetchUsers = e => {
    e.preventDefault()
    axios
      .get(`https://api.github.com/users/${this.state.username}`)
      .then(res => {
        this.setState ({
          username:res.data.login,
          name: res.data.name
        })
      })
  }

  render(){
  return (
    <div>
      <h1>GitHub User</h1>
      <input
        type='text'
        value={this.state.username}
        onChange={this.handleChanges}
      />
      <button onClick={this.fetchUsers}>Fetch User</button>
      <div>
        <h3>{this.state.username},  {this.state.name}</h3>
      </div>     
    </div>
  )}
}

export default App;
