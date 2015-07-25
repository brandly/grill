import React from 'react'
import { addons } from 'react/addons'
import ProfileActions from '../../actions/profile-actions'

export default class ChangeName extends React.Component {
  mixins: [addons.PureRenderMixin]

  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  handleFormSubmission(event) {
    event.preventDefault()

    const name = event.target.value
    const id = this.props.profileId
    ProfileActions.setNameForId({ name, id })

    this.setName('')
  }

  setName(name) {
    this.setState({ name })
  }

  handleChange(event) {
    this.setName(event.target.value)
  }

  render() {
    return (
      <form className="change-name" onSubmit={this.handleFormSubmission.bind(this)}>
        <input type="text"
               placeholder="your name"
               required
               value={this.state.name}
               onChange={this.handleChange.bind(this)} />
        <input type="submit" />
      </form>
    )
  }
}
