import React from 'react'
import { addons } from 'react/addons'
import askForMedia from '../modules/ask-for-media'
import PeerActions from '../actions/peer-actions'
import CallActions from '../actions/call-actions'
import CallStore from '../stores/call-store'

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
    }
  }

  componentWillMount() {
    CallStore.addChangeListener(() => {
      this.setState(this.getState())
    })
  }

  initiateVideoChat() {
    // TODO: move this into action? probably
    askForMedia(function (err, stream) {
      if (err) {
        console.log('problem getting user media', err);
      } else {
        PeerActions.initiateCall(stream)
      }
    })
  }

  answerVideoChat() {
    CallActions.acceptCall()
  }

  render() {
    const { isReceivingCall, isCallingFriend, isVideoChatting } = this.state

    if (isReceivingCall) {
      return (
        <div>
          <button onClick={this.answerVideoChat.bind(this)}>answer call</button>
        </div>
      )
    } else if (isCallingFriend) {
      // TODO: cancel button?
      return (
        <div>
          <p>calling...</p>
        </div>
      )
    } else if (isVideoChatting) {
      return <p>yay</p>
    } else {
      return (
        <div>
          <button onClick={this.initiateVideoChat.bind(this)}>video chat</button>
        </div>
      )
    }
  }
}
