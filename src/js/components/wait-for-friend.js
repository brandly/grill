import React from 'react'
import { addons } from 'react/addons'
import PeerStore from '../stores/peer-store'

export default class WaitForFriend extends React.Component {
  mixins: [addons.PureRenderMixin]

  constructor(props) {
    super(props)
    this.state = {
      id: PeerStore.getId()
    }
  }

  render() {
    const link = location.origin + '?g=' + this.state.id
    return (
      <div>
        <input type="text" placeholder="your name" />
        <p><a href={link} target="_blank">{ link }</a></p>
      </div>
    )
  }
}
