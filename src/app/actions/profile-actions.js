import grillDispatcher from '../dispatchers/grill-dispatcher'
import ActionTypes from '../constants/action-types'

const Actions = {
  setNameForId({ name, id }) {
    grillDispatcher.dispatch({
      type: ActionTypes.SET_NAME_FOR_ID,
      name,
      id
    })
  },

  receiveNameForId({ name, id }) {
    grillDispatcher.dispatch({
      type: ActionTypes.RECEIVE_NAME_FOR_ID,
      name,
      id
    })
  }
}

export { Actions as default }
