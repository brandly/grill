import { List } from 'immutable'
import assign from 'object-assign'
import EventEmitter from '../modules/event-emitter'
import grillDispatcher from '../dispatchers/grill-dispatcher'
import ActionTypes from '../constants/action-types'
import PeerStore from './peer-store'

const ConversationStore = assign({}, EventEmitter, {
  texts: List(),
  isFriendTyping: false,

  getIsFriendTyping() {
    return this.isFriendTyping
  },

  getTexts() {
    return this.texts
  },

  sendText(value) {
    this._addMessage({
      from: PeerStore.getId(),
      value
    })
  },

  receiveText(value) {
    this._addMessage({
      from: PeerStore.getFriendId(),
      value
    })
    this.receiveStopTyping()
  },

  receiveLog(value) {
    this._addLog({ value })
  },

  _addMessage(text) {
    text.type = 'message'
    this._addText(text)
  },

  _addLog(text) {
    text.type = 'log'
    this._addText(text)
  },

  _addText(text) {
    text.when = new Date
    this.texts = this.texts.push(text)
    this.emitChange()
  },

  receiveBeginTyping() {
    this.isFriendTyping = true
    this.emitChange()
  },

  receiveStopTyping() {
    this.isFriendTyping = false
    this.emitChange()
  },
})

ConversationStore.dispatchToken = grillDispatcher.register(action => {
  switch (action.type) {
    case ActionTypes.SEND_TEXT:
      ConversationStore.sendText(action.text)
      break

    case ActionTypes.RECEIVE_TEXT:
      ConversationStore.receiveText(action.text)
      break

    case ActionTypes.RECEIVE_BEGIN_TYPING:
      ConversationStore.receiveBeginTyping()
      break

    case ActionTypes.RECEIVE_STOP_TYPING:
      ConversationStore.receiveStopTyping()
      break

    case ActionTypes.INITIATE_CALL:
      ConversationStore.receiveLog('You initiated a video chat')
      break

    case ActionTypes.RECEIVE_CALL:
      ConversationStore.receiveLog('Your friend wants to video chat')
      break

    case ActionTypes.ACCEPT_CALL:
      ConversationStore.receiveLog('You accepted the video chat')
      break

    case ActionTypes.DENY_CALL:
      ConversationStore.receiveLog('You denied the video chat')
      break

    case ActionTypes.RECEIVE_DENY_CALL:
      ConversationStore.receiveLog('Your friend denied the video chat')
      break

    case ActionTypes.END_CALL:
      ConversationStore.receiveLog('You ended the video chat')
      break

    case ActionTypes.RECEIVE_END_CALL:
      ConversationStore.receiveLog('Your friend ended the video chat')
      break

    case ActionTypes.ESTABLISH_CONNECTION:
      ConversationStore.receiveLog('Your friend is ready to chat')
      break

    case ActionTypes.CLOSE_CONNECTION:
      ConversationStore.receiveLog('Lost connection to your friend')
      break
  }
})

export { ConversationStore as default }
