import './index.css'
import React from 'react'
import { addons } from 'react/addons'
import InlineSvg from 'react-inlinesvg'
import PeerActions from '../../actions/peer-actions'
import CallActions from '../../actions/call-actions'
import CallStore from '../../stores/call-store'
import closeSvg from './close.svg'

export default class CallCenter extends React.Component {
  mixins: [addons.PureRenderMixin]

  constructor(props) {
    super(props)
    this.state = this.getState()
  }

  getState() {
    return {
      isVideoChatting: CallStore.isVideoChatting(),
      localStream: CallStore.getLocalStream(),
      remoteStream: CallStore.getRemoteStream(),
    }
  }

  componentWillMount() {
    this._onChange = () => {
      this.setState(this.getState())
    }
    CallStore.addChangeListener(this._onChange)
  }

  componentWillUnmount() {
    CallStore.removeChangeListener(this._onChange)
  }

  initiateVideoChat() {
    PeerActions.initiateCall(stream)
  }

  endCall() {
    CallActions.endCall()
  }

  render() {
    const { isVideoChatting, localStream, remoteStream } = this.state

    if (!isVideoChatting) {
      return null
    }

    return (
      <div className="call-center">
        <video className="friend-video" src={URL.createObjectURL(remoteStream)} autoPlay />
        <video className="my-video" src={URL.createObjectURL(localStream)} autoPlay muted />
        <button className="end-call-button" onClick={this.endCall.bind(this)}>
          <InlineSvg src={closeSvg}></InlineSvg>
        </button>
      </div>
    )
  }
}
