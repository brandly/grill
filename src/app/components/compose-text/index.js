import './index.css'
import React from 'react'
import ConnectionActions from '../../actions/connection-actions'

export default class ComposeText extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  handleFormSubmission(event) {
    event.preventDefault()

    ConnectionActions.sendText({
      text: this.state.text
    })

    this.setText('')
  }

  setText(text) {
    if (!this.state.text && text) {
      ConnectionActions.beginTyping()
    } else if (this.state.text && !text) {
      ConnectionActions.stopTyping()
    }

    this.setState({ text })
  }

  handleChange(event) {
    this.setText(event.target.value)
  }

  render() {
    return (
      <form
        className="compose-text"
        onSubmit={this.handleFormSubmission.bind(this)}
      >
        <input
          type="text"
          placeholder="Message..."
          required
          autoFocus
          value={this.state.text}
          onChange={this.handleChange.bind(this)}
          className="text-input"
        />
        <input className="submit-text" type="submit" />
      </form>
    )
  }
}
