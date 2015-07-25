import grillDispatcher from '../dispatchers/grill-dispatcher'
import ActionTypes from '../constants/action-types'

const Actions = {
  acceptCall() {
    grillDispatcher.dispatch({
      type: ActionTypes.ACCEPT_CALL
    })
  },
}

export { Actions as default }
