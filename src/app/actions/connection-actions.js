import grillDispatcher from '../dispatchers/grill-dispatcher'
import ActionTypes from '../constants/action-types'

const Actions = {
  sendText({ text }) {
    grillDispatcher.dispatch({
      type: ActionTypes.SEND_TEXT,
      text
    })
  },

  receiveText({ text }) {
    grillDispatcher.dispatch({
      type: ActionTypes.RECEIVE_TEXT,
      text
    })
  },

  beginTyping() {
    grillDispatcher.dispatch({
      type: ActionTypes.BEGIN_TYPING
    })
  },

  receiveBeginTyping() {
    grillDispatcher.dispatch({
      type: ActionTypes.RECEIVE_BEGIN_TYPING
    })
  },

  stopTyping() {
    grillDispatcher.dispatch({
      type: ActionTypes.STOP_TYPING
    })
  },

  receiveStopTyping() {
    grillDispatcher.dispatch({
      type: ActionTypes.RECEIVE_STOP_TYPING
    })
  },

  closeConnection() {
    grillDispatcher.dispatch({
      type: ActionTypes.CLOSE_CONNECTION
    })
  }
}

export default Actions
