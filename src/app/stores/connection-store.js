import assign from 'object-assign'
import EventEmitter from '../modules/event-emitter'
import grillDispatcher from '../dispatchers/grill-dispatcher'
import ActionTypes from '../constants/action-types'
import ConnectionActions from '../actions/connection-actions'

const ConnectionStore = assign({}, EventEmitter, {
  connection: null,

  getConnection() {
    return this.connection
  },

  setConnection(connection) {
    this.connection = connection
    this.emitChange()
  },

  sendText(text) {
    this.connection.send({
      type: 'text',
      value: text
    })
  },

  sendBeginTyping() {
    this.connection.send({
      type: 'begin_typing'
    })
  },

  sendStopTyping() {
    this.connection.send({
      type: 'stop_typing'
    })
  },
})

ConnectionStore.dispatchToken = grillDispatcher.register(action => {
  switch (action.type) {
    case ActionTypes.ESTABLISH_CONNECTION:
      ConnectionStore.setConnection(action.connection)

      action.connection.on('data', function (data) {
        switch (data.type) {
          case 'text':
            ConnectionActions.receiveText({ text: data.value })
            break

          case 'begin_typing':
            ConnectionActions.receiveBeginTyping()
            break

          case 'stop_typing':
            ConnectionActions.receiveStopTyping()
            break
        }
      })
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
  }
})

export { ConnectionStore as default }
