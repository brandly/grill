import './index.css'
import React from 'react'
import Modal from 'react-modal'
import classNames from 'classnames'
import CallActions from '../../actions/call-actions'
import CallStore from '../../stores/call-store'
import ProfileStore from '../../stores/profile-store'
import NotificationStore from '../../stores/notification-store'
import TextChat from '../text-chat'
import CallCenter from '../call-center'
import ChangeName from '../change-name'

export default class ChillZone extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getState()
  }

  getState() {
    return {
      hasCall: CallStore.hasCall(),
      isCallingFriend: CallStore.isCallingFriend(),
      isReceivingCall: CallStore.isReceivingCall(),
      isVideoChatting: CallStore.isVideoChatting(),
      isChangingName: ProfileStore.isChangingName()
    }
  }

  componentWillMount() {
    ;[CallStore, ProfileStore].forEach((store) => {
      store.addChangeListener(() => {
        this.setState(this.getState())
      })
    })
  }

  acceptVideoChat() {
    CallActions.acceptCall()
  }

  denyVideoChat() {
    CallActions.denyCall()
  }

  render() {
    const { connectionOpen } = this.props
    const {
      hasCall,
      isCallingFriend,
      isReceivingCall,
      isVideoChatting,
      isChangingName
    } = this.state
    const textChatProps = { hasCall, isCallingFriend, isVideoChatting }

    const classes = classNames({
      'chill-zone': true,
      'is-video-chatting': isVideoChatting
    })

    return (
      <div className={classes}>
        {isVideoChatting ? <CallCenter /> : null}
        <TextChat {...textChatProps} />

        <Modal className="change-name-modal" isOpen={isChangingName}>
          <p>What's your name?</p>
          <ChangeName />
        </Modal>

        <Modal isOpen={!connectionOpen}>
          <p>Connecting to friend...</p>
        </Modal>

        <Modal className="receiving-call-modal" isOpen={isReceivingCall}>
          <p>Your friend wants to video chat</p>
          <button
            className="accept-video-button"
            onClick={this.acceptVideoChat.bind(this)}
          >
            Let's do it
          </button>
          <button
            className="reject-video-button"
            onClick={this.denyVideoChat.bind(this)}
          >
            I'd rather not
          </button>
        </Modal>
      </div>
    )
  }
}
