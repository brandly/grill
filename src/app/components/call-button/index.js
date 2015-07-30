import './index.css'
import React from 'react'
import { addons } from 'react/addons'
import InlineSvg from 'react-inlinesvg'
import PeerActions from '../../actions/peer-actions'
import cameraSvg from './camera.svg'

export default class CallCenter extends React.Component {
  mixins: [addons.PureRenderMixin]

  initiateVideoChat() {
    PeerActions.initiateCall()
  }

  getInnerEl() {
    const { hasCall, isCallingFriend } = this.props

    if (!hasCall) {
      return (
        <button className="camera-button" onClick={this.initiateVideoChat.bind(this)}>
          <InlineSvg src={cameraSvg}></InlineSvg>
        </button>
      )
    } else if (isCallingFriend) {
      return <p className="calling-indicator">calling...</p>
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
