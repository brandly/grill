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
})

ConnectionStore.dispatchToken = grillDispatcher.register(action => {
  switch (action.type) {
    case ActionTypes.ESTABLISH_CONNECTION:
      ConnectionStore.setConnection(action.connection)

      action.connection.on('data', function (data) {
        if (data.type === 'text') {
          ConnectionActions.receiveText({ text: data.value })
        }
      })
      break

    case ActionTypes.SEND_TEXT:
      ConnectionStore.sendText(action.text)
      break
  }
})

export { ConnectionStore as default }
