import './index.css'
import React from 'react'
import { addons } from 'react/addons'
import URI from 'URIjs'
import classNames from 'classnames'
import ConversationStore from '../../stores/conversation-store'

export default class TextChat extends React.Component {
  mixins: [addons.PureRenderMixin]

  scrollToBottom() {
    const el = React.findDOMNode(this.refs.scroller)
    el.scrollTop = el.scrollHeight
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  linkify(text) {
    const split = text.split(URI.find_uri_expression)
    const result = []

    for (var i = 0; i < split.length; ++i) {
      let value = split[i]
      if (value !== undefined) {
        if (i + 1 < split.length && split[i + 1] === undefined) {
          result.push(
            <a href={value}
               target="_blank">{value}</a>
            )
        } else {
          result.push(value)
        }
      }
    }
    return result
  }

  render() {
    const { texts, peerId, isFriendTyping } = this.props

    if (!texts) {
      return null
    }

    let textElements = texts.map((text, i) => {
      const showFrom = (i === 0 || texts.get(i - 1).from !== text.from)
      const classes = classNames({
        sent: text.from === peerId,
        received: text.from !== peerId,
        text: true
      })

      return (
        <li className={classes} key={i}>
          {showFrom ? (<h3 className="text-from">{text.from}</h3>) : null}
          <p className="text-value">{this.linkify(text.value)}</p>
          <p className="text-when">{formatDate(text.when)}</p>
        </li>
      )
    })

    if (isFriendTyping) {
      textElements = textElements.push(
        <li key="is-friend-typing">
          <p className="is-friend-typing">typing...</p>
        </li>
      )
    }

    return (
      <div className="scrolling-panel" ref="scroller">
        <ul className="text-list">
          {textElements.toArray()}
        </ul>
      </div>
    )
  }
}

function formatDate(d) {
  return `${twoDigits(d.getHours())}:${twoDigits(d.getMinutes())}:${twoDigits(d.getSeconds())}`
}

function twoDigits(str) {
  str = '' + str
  return (str.length < 2) ? ('0' + str) : str
}

export { TextChat as default }