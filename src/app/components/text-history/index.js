import './index.css'
import React from 'react'
const { useRef } = React
import URI from 'URIjs'
import classNames from 'classnames'
import ConversationStore from '../../stores/conversation-store'

const IMAGE_REGEX = /\.(jpe?g|png|gif|svg)$/i

//   scrollToBottom() {
//     const el = React.findDOMNode(this.refs.scroller)
//     el.scrollTop = el.scrollHeight
//   }
//   componentDidUpdate() {
//     this.scrollToBottom()
//   }

const TextChat = (props) => {
  const { texts, isFriendTyping } = props
  if (!texts) {
    return null
  }

  const linkify = (text) => {
    const split = text.split(URI.find_uri_expression)
    const result = []

    for (var i = 0; i < split.length; ++i) {
      let value = split[i]
      if (value !== undefined) {
        if (i + 1 < split.length && split[i + 1] === undefined) {
          result.push(
            <a key={i} href={value} target="_blank">
              {value}
            </a>
          )
        } else {
          result.push(value)
        }
      }
    }
    return result
  }

  const createMessage = (text, i) => {
    const { texts, peerId, idToName } = props

    const showFrom = i === 0 || texts.get(i - 1).from !== text.from
    const classes = classNames({
      sent: text.from === peerId,
      received: text.from !== peerId,
      message: true
    })

    return (
      <li className={classes} key={i}>
        {showFrom && (
          <h3 className="message-from">{idToName[text.from] || text.from}</h3>
        )}
        <p className="message-value">{linkify(text.value)}</p>
        <abbr className="message-when" title={fullDate(text.when)}>
          {timestamp(text.when)}
        </abbr>
        <Images text={text.value} />
      </li>
    )
  }

  let textElements = texts.map((text, i) => {
    switch (text.type) {
      case 'message':
        return createMessage(text, i)
        break
      case 'log':
        return (
          <li className="log" key={i}>
            <p>
              <span className="log-value">{text.value}</span>
            </p>
          </li>
        )
    }
  })

  if (isFriendTyping) {
    textElements = textElements.push(
      <li key="is-friend-typing">
        <p className="is-friend-typing">typing...</p>
      </li>
    )
  }

  const scroller = useRef(null)

  return (
    <div className="scrolling-panel" ref={scroller}>
      <ul className="text-list">{textElements.toArray()}</ul>
    </div>
  )
}
export default TextChat

const Images = ({ text }) => {
  const urls = text.match(URI.find_uri_expression)

  if (urls) {
    return urls
      .filter((url) => {
        return IMAGE_REGEX.test(url)
      })
      .map((imgUrl, i) => {
        const key = 'img-' + i
        return (
          <a href={imgUrl} target="_blank" key={key}>
            <img className="img-preview" src={imgUrl} />
          </a>
        )
      })
  }
  return null
}

function timestamp(d) {
  const basicHours = d.getHours()
  const postfix = basicHours < 12 ? 'AM' : 'PM'
  const hours = basicHours > 12 ? basicHours - 12 : basicHours
  return `${hours}:${twoDigits(d.getMinutes())} ${postfix}`
}

function fullDate(d) {
  return `${daysOfWeek[d.getDay()]}, ${
    months[d.getMonth()]
  } ${d.getDate()}, ${d.getFullYear()} at ${timestamp(d)}`
}

function twoDigits(num) {
  num = num.toString()
  return num.length < 2 ? '0' + num : num
}

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
