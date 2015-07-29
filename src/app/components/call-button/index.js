import './index.css'
import React from 'react'
import { addons } from 'react/addons'
import PeerActions from '../../actions/peer-actions'

export default class CallCenter extends React.Component {
  mixins: [addons.PureRenderMixin]

  initiateVideoChat() {
    PeerActions.initiateCall()
  }

  getInnerEl() {
    const { hasCall, isCallingFriend } = this.props

    if (!hasCall) {
      return <button onClick={this.initiateVideoChat.bind(this)}>callll</button>
    } else if (isCallingFriend) {
      return <p>calling...</p>
    } else {
      return null
    }
  }

  render() {
    return (
      <div className="call-button">
        {this.getInnerEl()}
      </div>
    )
  }
}
