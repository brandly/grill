import grillDispatcher from '../dispatchers/grill-dispatcher'
import ActionTypes from '../constants/action-types'

const Actions = {
  acceptCall() {
    grillDispatcher.dispatch({
      type: ActionTypes.ACCEPT_CALL
    })
  },

  denyCall() {
    grillDispatcher.dispatch({
      type: ActionTypes.DENY_CALL
    })
  },

  receiveDenyCall() {
    grillDispatcher.dispatch({
      type: ActionTypes.RECEIVE_DENY_CALL
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
  }
}

export default Actions
