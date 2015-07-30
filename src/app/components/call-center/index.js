import './index.css'
import React from 'react'
import { addons } from 'react/addons'
import PeerActions from '../../actions/peer-actions'
import CallActions from '../../actions/call-actions'
import CallStore from '../../stores/call-store'

export default class CallCenter extends React.Component {
  mixins: [addons.PureRenderMixin]

  constructor(props) {
    super(props)
    this.state = this.getState()
  }

  getState() {
    return {
      isReceivingCall: CallStore.isReceivingCall(),
      isCallingFriend: CallStore.isCallingFriend(),
      isVideoChatting: CallStore.isVideoChatting(),
      localStream: CallStore.getLocalStream(),
      remoteStream: CallStore.getRemoteStream(),
    }
  }

  componentWillMount() {
    CallStore.addChangeListener(() => {
      this.setState(this.getState())
    })
  }

  initiateVideoChat() {
    PeerActions.initiateCall(stream)
  }

  render() {
    const { isReceivingCall, isCallingFriend, isVideoChatting, localStream, remoteStream } = this.state

    if (!isVideoChatting) {
      return null
    }

    return (
      <div className="call-center">
        <video className="friend-video" src={URL.createObjectURL(remoteStream)} autoPlay />
        <video className="my-video" src={URL.createObjectURL(localStream)} autoPlay muted />
      </div>
    )
  }
}
