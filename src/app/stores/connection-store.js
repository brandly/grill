import assign from 'object-assign'
import keyMirror from 'keymirror'
import EventEmitter from '../modules/event-emitter'
import grillDispatcher from '../dispatchers/grill-dispatcher'
import ActionTypes from '../constants/action-types'
import ConnectionActions from '../actions/connection-actions'
import CallActions from '../actions/call-actions'

const DataTypes = keyMirror({
  'TEXT': null,
  'BEGIN_TYPING': null,
  'STOP_TYPING': null,
  'END_CALL': null,
})

const ConnectionStore = assign({}, EventEmitter, {
  connection: null,
  open: false,

  isOpen() {
    return this.open
  },

  getConnection() {
    return this.connection
  },

  setConnection(connection) {
    this.connection = connection
    this.emitChange()

    connection.on('open', () => {
      this.open = true
      this.emitChange()
    })

    connection.on('data', (data) => {
      switch (data.type) {
        case DataTypes.TEXT:
          ConnectionActions.receiveText({ text: data.value })
          break

        case DataTypes.BEGIN_TYPING:
          ConnectionActions.receiveBeginTyping()
          break

        case DataTypes.STOP_TYPING:
          ConnectionActions.receiveStopTyping()
          break

        case DataTypes.END_CALL:
          CallActions.receiveEndCall()
          break
      }
    })

    connection.on('close', () => {

    })

    connection.on('error', (err) => {

    })
  },

  sendText(text) {
    this.connection.send({
      type: DataTypes.TEXT,
      value: text
    })
  },

  sendBeginTyping() {
    this.connection.send({
      type: DataTypes.BEGIN_TYPING
    })
  },

  sendStopTyping() {
    this.connection.send({
      type: DataTypes.STOP_TYPING
    })
  },

  sendEndCall() {
    this.connection.send({
      type: DataTypes.END_CALL
    })
  },
})

ConnectionStore.dispatchToken = grillDispatcher.register(action => {
  switch (action.type) {
    case ActionTypes.ESTABLISH_CONNECTION:
      ConnectionStore.setConnection(action.connection)
      break

    case ActionTypes.SEND_TEXT:
      ConnectionStore.sendText(action.text)
      break

    case ActionTypes.BEGIN_TYPING:
      ConnectionStore.sendBeginTyping()
      break

    case ActionTypes.STOP_TYPING:
      ConnectionStore.sendStopTyping()
      break

    case ActionTypes.END_CALL:
      ConnectionStore.sendEndCall()
      break
  }
})

export { ConnectionStore as default }
