import React, { Component } from 'react'

class TypingIndicator extends Component {
  render() {
      if (this.props.userWhoAreTyping.length === 0)
        return <div></div>
      else if (this.props.userWhoAreTyping.length === 1)
        return <p>{this.props.userWhoAreTyping[0]} is typing ...</p>
      else if (this.props.userWhoAreTyping.length > 1)
        return <p>{this.props.userWhoAreTyping.join(' and ')} are typing ...</p>
      else 
        return <div></div>
    }

  // render() {
  //   if (this.props.usersWhoAreTyping.length > 0) {
  //     return (
  //       <div>
  //         {`${this.props.usersWhoAreTyping.slice(0, 2).join(' and ')} is typing`}
  //       </div >
  //     )
  //   }
  //   return <div />
  // }

}

export default TypingIndicator;
