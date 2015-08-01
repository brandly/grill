import grillDispatcher from '../dispatchers/grill-dispatcher'
import ActionTypes from '../constants/action-types'

const Actions = {
  noSupport() {
    grillDispatcher.dispatch({
      type: ActionTypes.NO_SUPPORT
    })
  },
}

export { Actions as default }
