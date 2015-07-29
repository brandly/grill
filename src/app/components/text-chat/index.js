import React from 'react'
import { addons } from 'react/addons'
import './index.css'
import TextHistory from '../text-history'
import ComposeText from '../compose-text'
import ConversationStore from '../../stores/conversation-store'
import PeerStore from '../../stores/peer-store'

export default class TextChat extends React.Component {
  mixins: [addons.PureRenderMixin]

  constructor(props) {
    super(props)
    this.state = this.getState()
  }

  getState() {
    return {
      texts: ConversationStore.getTexts(),
      peerId: PeerStore.getId()
    }
  }

  componentWillMount() {
    [ConversationStore, PeerStore].forEach(store => {
      store.addChangeListener(() => {
        this.setState(this.getState())
      })
    })
  }

  render() {
    const { texts, peerId } = this.state
    return (
      <div className="text-chat">
        <div className="above-footer">
          <TextHistory texts={texts} peerId={peerId} />
        </div>
        <div className="absolute-footer">
          <ComposeText />
        </div>
      </div>
    )
  }
}
