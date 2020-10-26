import './index.css'
import React from 'react'
import classNames from 'classnames'
import ConversationStore from '../../stores/conversation-store'
import PeerStore from '../../stores/peer-store'
import ProfileStore from '../../stores/profile-store'
import TextHistory from '../text-history'
import ComposeText from '../compose-text'
import CallButton from '../call-button'

export default class TextChat extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getState()
  }

  getState() {
    return {
      texts: ConversationStore.getTexts(),
      isFriendTyping: ConversationStore.getIsFriendTyping(),
      peerId: PeerStore.getId(),
      idToName: ProfileStore.getIdToNameMap(),
    }
  }

  componentWillMount() {
    [ConversationStore, PeerStore, ProfileStore].forEach(store => {
      store.addChangeListener(() => {
        this.setState(this.getState())
      })
    })
  }

  render() {
    const { texts, peerId, isFriendTyping, idToName } = this.state
    const { isVideoChatting, hasCall, isCallingFriend, isReceivingCall } = this.props

    const showCallButton = !hasCall || isCallingFriend
    const callButtonProps = { hasCall, isCallingFriend }

    const textHistoryProps = { texts, peerId, isFriendTyping, idToName }

    const footerClasses = classNames({
      'absolute-footer': true,
      'show-call-button': showCallButton
    })

    return (
      <div className="text-chat">
        <div className="above-footer">
          <TextHistory {...textHistoryProps} />
        </div>
        <div className={footerClasses}>
          <ComposeText />
          {showCallButton ? (<CallButton {...callButtonProps} />) : null}
        </div>
      </div>
    )
  }
}
