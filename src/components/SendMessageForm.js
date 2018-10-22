import React, { Component } from 'react'

class SendMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  onChange = e => {
    this.setState({ text: e.target.value });
    if(this.props.onChange)
      this.props.onChange(this.state.text);
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
    this.setState({ text: '' });
  }

  render() {
    const styles = {
      container: {
        padding: '20px',
        borderTop: '1px #4C758F solid',
        marginBottom: '20px'
      },
      form: {
        display: 'flex'
      },
      input: {
        color: 'inherit',
        background: 'none',
        outline: 'none',
        border: 'none',
        flex: '1px',
        fontSize: '16pt'
      },
    }

    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)} style={styles.form}>
          <input 
            type="text" 
            placeholder="Type a message here then hit ENTER" 
            onChange={this.onChange.bind(this)}
            value={this.state.text}
            style={styles.input}
             />
        </form>

      </div>
    )
  }
}

export default SendMessageForm;

