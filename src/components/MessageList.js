import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    const styles = {
      container: {
        overflowY: 'scroll',
        flex: '1px'
      },
      ul: {
        listStyle: 'none'
      },
      li: {
         marginTop: '13px',
         marginBottom: '13px'
       },
      senderUsername: {
        fontWeight: 'bold'
      },
      message: { fontSize: '15pt' }
    }
    const { messages } = this.props;

    const msgs = messages.map((message, i) => {
      return <li key={i} style={styles.li}>
          <div>
            <span style={styles.senderUsername}>{message.senderId}</span>{' '}
          </div>
          <p style={styles.message}>{message.text}</p>
        </li>;
    });

    return <div style={{
          ...styles.container,
      }}>
      <ul style={styles.ul}>
          {msgs}
        </ul>
      </div>;
  }
}

export default MessageList;