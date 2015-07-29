import './index.css'
import React from 'react'
import { addons } from 'react/addons'
import ConnectionActions from '../../actions/connection-actions'

export default class ComposeText extends React.Component {
  mixins: [addons.PureRenderMixin]

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
    this.setState({ text })
  }

  handleChange(event) {
    this.setText(event.target.value)
  }

  render() {
    return (
      <form className="compose-text" onSubmit={this.handleFormSubmission.bind(this)}>
        <input type="text"
               placeholder="Message..."
               required
               value={this.state.text}
               onChange={this.handleChange.bind(this)}
               className="text-input" />
        <input className="submit-text" type="submit" />
      </form>
    )
  }
}
