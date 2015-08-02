import './index.css'
import React from 'react'
import { addons } from 'react/addons'
import Modal from 'react-modal'
import classNames from 'classnames'
import CallActions from '../../actions/call-actions'
import CallStore from '../../stores/call-store'
import TextChat from '../text-chat'
import CallCenter from '../call-center'

export default class ChillZone extends React.Component {
  mixins: [addons.PureRenderMixin]

  constructor(props) {
    super(props)
    this.state = this.getState()
  }

  getState() {
    return {
      hasCall: CallStore.hasCall(),
      isCallingFriend: CallStore.isCallingFriend(),
      isReceivingCall: CallStore.isReceivingCall(),
      isVideoChatting: CallStore.isVideoChatting()
    }
  }

  componentWillMount() {
    CallStore.addChangeListener(() => {
      this.setState(this.getState())
    })
  }

  acceptVideoChat() {
    CallActions.acceptCall()
  }

  rejectVideoChat() {
    console.log('tryna reject')
  }

  render() {
    const { connectionOpen } = this.props
    const { hasCall, isCallingFriend, isReceivingCall, isVideoChatting } = this.state
    const textChatProps = { hasCall, isCallingFriend, isVideoChatting}

    const classes = classNames({
      'chill-zone': true,
      'is-video-chatting': isVideoChatting
    })

    return (
      <div className={classes}>
        {isVideoChatting ? (<CallCenter />) : null}
        <TextChat {...textChatProps} />

        <Modal className="receiving-call-modal" isOpen={!connectionOpen}>
          <p>Connecting to friend...</p>
        </Modal>

        <Modal className="receiving-call-modal" isOpen={isReceivingCall}>
          <p>Your friend wants to video chat</p>
          <button className="accept-video-button" onClick={this.acceptVideoChat.bind(this)}>Let's do it</button>
          <button className="reject-video-button" onClick={this.rejectVideoChat.bind(this)}>I'd rather not</button>
        </Modal>
      </div>
    )
  }
}
