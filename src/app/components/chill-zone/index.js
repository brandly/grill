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

  answerVideoChat() {
    CallActions.acceptCall()
  }

  render() {
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
        <Modal isOpen={isReceivingCall}>
          <p>Your friend wants to video chat</p>
          <button onClick={this.answerVideoChat.bind(this)}>Accept</button>
        </Modal>
      </div>
    )
  }
}
