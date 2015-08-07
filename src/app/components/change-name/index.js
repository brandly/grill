import './index.css'
import React from 'react'
import { addons } from 'react/addons'
import ProfileActions from '../../actions/profile-actions'
import PeerStore from '../../stores/peer-store'

export default class ChangeName extends React.Component {
  mixins: [addons.PureRenderMixin]

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      id: PeerStore.getId()
    }
  }

  componentWillMount() {
    // This really shouldn't happen but it feels ok
    PeerStore.addChangeListener(() => {
      this.setState({
        id: PeerStore.getId()
      })
    })
  }

  handleFormSubmission(event) {
    event.preventDefault()

    const { name, id } = this.state
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
               placeholder="My name is..."
               required
               value={this.state.name}
               onChange={this.handleChange.bind(this)} />
        <input type="submit" />
      </form>
    )
  }
}
