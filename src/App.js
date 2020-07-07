import React from 'react';
import axios from 'axios'

class App extends React.Component {
  state ={
    username: '',
    name: '',
    img: '',
    location: '', 
    followers:[]
  }

  componentDidMount(){
    axios.get('https://api.github.com/users/dstemple7')
    .then(res => {
      this.setState({
        username: res.data.login,
        name: res.data.name,
        location: res.data.location,
        img: res.data.avatar_url
      })
    })
  }

  handleChanges = e => {
    this.setState({
      login: e.target.value
    })
  }

  fetchUsers = e => {
    e.preventDefault()
    axios
      .get(`https://api.github.com/users/${this.state.login}`)
      .then(res => {
        this.setState ({
          username:res.data.login,
          name: res.data.name,
          location: res.data.location,
          img: res.data.avatar_url
        })
      })
  }

  fetchFollowers = e => {
    e.preventDefault()
    axios
      .get(`https://api.github.com/users/${this.state.login}/followers`)
      .then(res => {
        this.setState ({
          followers: res.data.map(follower => (
            <div>
              <img src={follower.avatar_url}/>
              <h5>Git @ me @ {follower.url}</h5>
            </div>
          ))
        })
      })
  }

  render(){
  return (
    <div>
      <h1>Are we using GitHub or is GitHub aka Microsoft using us???</h1>
      <input
        type='text'
        value={this.state.login}
        onChange={this.handleChanges}
      />
      <br></br>
      <button onClick={this.fetchUsers}>Fetch User</button>
      <button onClick={this.fetchFollowers}>Fetch Followers</button>
      <div>
        <h3>{this.state.username} aka {this.state.name} from {this.state.location}</h3>
        <img src={this.state.img}/>
        <br></br>
        <h1>My Followers</h1>
        {this.state.followers}
      </div>
    </div>
  )}
}

export default App;
