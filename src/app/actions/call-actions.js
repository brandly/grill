import grillDispatcher from '../dispatchers/grill-dispatcher'
import ActionTypes from '../constants/action-types'

const Actions = {
  acceptCall() {
    grillDispatcher.dispatch({
      type: ActionTypes.ACCEPT_CALL
    })
  },

  endCall() {
    grillDispatcher.dispatch({
      type: ActionTypes.END_CALL
    })
  },

  receiveEndCall() {
    grillDispatcher.dispatch({
      type: ActionTypes.RECEIVE_END_CALL
    })
  },
}

export { Actions as default }
