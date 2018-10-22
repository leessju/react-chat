import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import TypingIndicator from './TypingIndicator';
import WhosOnlineList from './WhosOnlineList';

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentRoom: {},
      currentUser: {},
      userWhoAreTyping: []
    };
  }

  componentDidMount() {
    const { currentUsername } = this.props;

    const chatManager = new ChatManager({
      instanceLocator: 'v1:us1:7195ecd4-8d2a-4681-80b3-e07c849a71cd',
      userId: currentUsername,
      tokenProvider: new TokenProvider({ url: '/auth' })
    });
 
    chatManager
      .connect()
      .then(currentUser => {
        this.setState({currentUser});
        currentUser
          .subscribeToRoom({
            roomId: 19211430,
            hooks: {
              onNewMessage: message => {
                //console.log(`Received new message ${message.text}`);
                this.setState({
                  messages: [...this.state.messages, message]
                });
                //console.log(this.state);
              },
              onUserStartedTyping: user => { 
                //console.log(user.name, ' started typing...') 
                this.setState({
                  userWhoAreTyping: [
                    ...this.state.userWhoAreTyping,
                    user.name
                  ]
                });
              },
              onUserStoppedTyping: user => { 
                //console.log(user.name, ' stopped typing...') 
                this.setState({
                  userWhoAreTyping: this.state.userWhoAreTyping.filter(username => username !== user.name)
                });
              },
              onUserCameOnline: () => this.forceUpdate(),
              onUserWentOffline: () => this.forceUpdate(),
              onUserJoined: () => this.forceUpdate()

            },
            messageLimit: 10
          })
          .then(currentRoom => {
            this.setState({ currentRoom });
          }) 
          .catch(err => console.error(err));
      })
      .catch(err => {
        console.log('Error on connection', err);
      });

    chatManager.connect({
      onAddedToRoom: room => {
        console.log(`Added to room ${room.name}`);
      },
      onRemovedFromRoom: room => {
        console.log(`Removed to room ${room.name}`);
      },
      onRoomUpdated: room => {
        console.log(`Updated to room ${room.name}`);
      },
      onRoomDeleted: room => {
        console.log(`Deleted to room ${room.name}`);
      },
      onUserJoinedRoom: (room, user) => {
        console.log(`${user.name} joined to room ${room.name}`);
      }
    });
  }

  onSendMessage = text => {
    this.state.currentUser.sendMessage({
      roomId: this.state.currentRoom.id,
      text
    });
  };

  onChangeText = text => {
    this.state.currentUser
      .isTypingIn({roomId: this.state.currentRoom.id})
      .catch(err => console.error('error', err));
  }

  render() {

    return <div style={{
        display: 'flex',
        height: "100vh"
      }}> 
        <div style={{
          width: '300px',
          flex: 'none',
          padding: '20px',
          backgroundColor: '#2c303b',
          color: 'white'
        }}>
          <h2>Who's online list</h2>
          <WhosOnlineList 
            users={this.state.currentRoom.users}
            currentUser={this.state.currentUser} />
        </div>
        <div style={{
          padding: '20px',
          width: '85%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h1>Chat</h1>
          <div style={{
            flex: '1px'
          }}>
            <MessageList messages={this.state.messages} />
          </div>
          <TypingIndicator userWhoAreTyping={this.state.userWhoAreTyping} />
          <SendMessageForm onSubmit={this.onSendMessage.bind(this)} onChange={this.onChangeText.bind(this)} />
        </div>
      </div>;
  }
}

export default ChatScreen;
