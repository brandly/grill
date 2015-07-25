import React from 'react'
import { addons } from 'react/addons'
import TextHistory from '../text-history'
import ComposeText from '../compose-text'
import ConversationStore from '../../stores/conversation-store'

export default class TextChat extends React.Component {
  mixins: [addons.PureRenderMixin]

  constructor(props) {
    super(props)
    this.state = {
      texts: ConversationStore.getTexts()
    }
  }

  componentWillMount() {
    ConversationStore.addChangeListener(() => {
      this.setState({
        texts: ConversationStore.getTexts()
      })
    })
  }

  render() {
    return (
      <div>
        <TextHistory texts={this.state.texts} />
        <ComposeText />
      </div>
    )
  }
}
