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
}

export { Actions as default }
