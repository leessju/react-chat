import React, { Component } from 'react';
import UsernameForm from './components/UsernameForm';
import ChatScreen from './components/ChatScreen';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentScreen: 'WhatIsYourUsernameScreen',
      currentUsername: ''
    };

    this.onUsernameSubmit = this.onUsernameSubmit.bind(this);
  }

  onUsernameSubmit = username => {

    axios.post('/users', {username})
    .then(res => {
      console.log(res.data);
      this.setState({ 
        currentUsername: username,
        currentScreen: 'ChatScreen'
      });
    })
    .catch(err => {
      console.log(err.response.data);
    });
  }

  render() {
    if (this.state.currentScreen === 'WhatIsYourUsernameScreen' ) {
      return <UsernameForm onSubmit={this.onUsernameSubmit} />
    } else if (this.state.currentScreen === 'ChatScreen') {
      return <ChatScreen currentUsername={this.state.currentUsername} />
    }
    
  }
}

export default App;
