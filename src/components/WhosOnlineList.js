import React, { Component } from 'react'
import WhosOnlineListItem from './WhosOnlineListItem';

class WhosOnlineList extends Component {
  render() {
    if (this.props.users) {
      return (
        <ul>
          {this.props.users.map((user, idx) => {
            if (user.id === this.props.currentUser.id) {
              return (
                <WhosOnlineListItem key={idx} presenceState="online" >
                  {user.name}(You)
                </WhosOnlineListItem>
              )
            }
            return (
              <WhosOnlineListItem key={idx} presenceState={user.presence.state} >
                {user.name}
              </WhosOnlineListItem>
            )
          })}
        </ul>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}

export default WhosOnlineList;
