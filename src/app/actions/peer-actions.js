import grillDispatcher from '../dispatchers/grill-dispatcher'
import ActionTypes from '../constants/action-types'

const Actions = {
  receivePeerId(id) {
    grillDispatcher.dispatch({
      type: ActionTypes.RECEIVE_PEER_ID,
      id
    })
  },

  establishConnection(connection) {
    grillDispatcher.dispatch({
      type: ActionTypes.ESTABLISH_CONNECTION,
      connection
    })
  },

  initiateCall() {
    grillDispatcher.dispatch({
      type: ActionTypes.INITIATE_CALL
    })
  },

  receiveCall(call) {
    grillDispatcher.dispatch({
      type: ActionTypes.RECEIVE_CALL,
      call
    })
  }
}

export { Actions as default }
