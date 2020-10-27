import assign from 'object-assign'
import keyMirror from 'keymirror'
import EventEmitter from '../modules/event-emitter'
import grillDispatcher from '../dispatchers/grill-dispatcher'
import ActionTypes from '../constants/action-types'
import ConnectionActions from '../actions/connection-actions'
import CallActions from '../actions/call-actions'
import ProfileActions from '../actions/profile-actions'

const DataTypes = keyMirror({
  TEXT: null,
  BEGIN_TYPING: null,
  STOP_TYPING: null,
  DENY_CALL: null,
  END_CALL: null,
  NAME_FOR_ID: null
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

        case DataTypes.DENY_CALL:
          CallActions.receiveDenyCall()
          break

        case DataTypes.END_CALL:
          CallActions.receiveEndCall()
          break

        case DataTypes.NAME_FOR_ID:
          ProfileActions.receiveNameForId({
            name: data.name,
            id: data.id
          })
          break
      }
    })

    connection.on('close', () => {
      ConnectionActions.closeConnection()
    })

    connection.on('error', (err) => {})
  },

  clearConnection() {
    this.connection = null
    this.open = false
    this.emitChange()
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

  sendDenyCall() {
    this.connection.send({
      type: DataTypes.DENY_CALL
    })
  },

  sendEndCall() {
    this.connection.send({
      type: DataTypes.END_CALL
    })
  },

  sendNameForId(name, id) {
    this.connection.send({
      type: DataTypes.NAME_FOR_ID,
      name,
      id
    })
  }
})

ConnectionStore.dispatchToken = grillDispatcher.register((action) => {
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

    case ActionTypes.DENY_CALL:
      ConnectionStore.sendDenyCall()
      break

    case ActionTypes.END_CALL:
      ConnectionStore.sendEndCall()
      break

    case ActionTypes.CLOSE_CONNECTION:
      ConnectionStore.clearConnection()
      break

    case ActionTypes.SET_NAME_FOR_ID:
      ConnectionStore.sendNameForId(action.name, action.id)
      break
  }
})

export { ConnectionStore as default }
