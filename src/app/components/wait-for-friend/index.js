import './index.css'
import React from 'react'
import { addons } from 'react/addons'
import PeerStore from '../../stores/peer-store'
import ChangeName from '../change-name'

export default class WaitForFriend extends React.Component {
  mixins: [addons.PureRenderMixin]

  constructor(props) {
    super(props)
    this.state = {
      id: PeerStore.getId()
    }
  }

  getLink(id) {
    return location.href + '?g=' + id
  }

  render() {
    const { id } = this.state
    const link = this.getLink(id)
    return (
      <div className="wait-for-friend">
        <div className="share-link-container">
          <p>Share this link with a friend to begin chatting</p>
          <p className="share-link-p"><a href={link} target="_blank">{ link }</a></p>
        </div>

        <div>
          <p>TODO: EXPLAIN WHAT THIS THING IS</p>
        </div>
      </div>
    )
  }
}
