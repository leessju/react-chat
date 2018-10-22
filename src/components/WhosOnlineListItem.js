import React, { Component } from 'react';

class WhosOnlineListItem extends Component {
  render() {
    const styles = {
      li: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '5px',
        marginBottom: '5px',
        paddingTop: '2px',
        paddingBottom: '2px'
      },
      div: {
        borderRadius: '50%',
        width: '11px',
        height: '11px',
        marginRight: '10px'
      },
    }
    return (
      <li style={styles.li} >
        <div
          style={
            {
              ...styles.div,
              backgroundColor:
                this.props.presenceState === 'online' ? '#539eff' : '#414756',
            }
          }
        />
        {this.props.children}
      </li >
    )
  }
}

export default WhosOnlineListItem;

