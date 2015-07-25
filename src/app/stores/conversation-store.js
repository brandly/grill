import { List } from 'immutable'
import assign from 'object-assign'
import EventEmitter from '../modules/event-emitter'
import grillDispatcher from '../dispatchers/grill-dispatcher'
import ActionTypes from '../constants/action-types'
import PeerStore from './peer-store'

const ConversationStore = assign({}, EventEmitter, {
  texts: List(),

  getTexts() {
    return this.texts
  },

  sendText(value) {
    this._addText({
      from: PeerStore.getId(),
      value
    })
  },

  receiveText(value) {
    this._addText({
      from: PeerStore.getFriendId(),
      value
    })
  },

  _addText(text) {
    text.when = new Date
    this.texts = this.texts.push(text)
    this.emitChange()
  }
})

ConversationStore.dispatchToken = grillDispatcher.register(action => {
  switch (action.type) {
    case ActionTypes.SEND_TEXT:
      ConversationStore.sendText(action.text)
      break

    case ActionTypes.RECEIVE_TEXT:
      ConversationStore.receiveText(action.text)
      break
  }
})

export { ConversationStore as default }
