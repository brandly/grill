import assign from 'object-assign'
import EventEmitter from '../modules/event-emitter'
import grillDispatcher from '../dispatchers/grill-dispatcher'
import ActionTypes from '../constants/action-types'

const ProfileStore = assign({}, EventEmitter, {
  names: {},
  _isChangingName: true, // ask them for a name up front

  isChangingName() {
    return this._isChangingName
  },

  getNameForId(id) {
    return this.names[id] || null
  },

  setNameForId(name, id) {
    this._isChangingName = false
    this.receiveNameForId(name, id)
  },

  receiveNameForId(name, id) {
    this.names[id] = name
    this.emitChange()
  },

  getIdToNameMap() {
    // kinda sketchy
    return this.names
  }
})

ProfileStore.dispatchToken = grillDispatcher.register((action) => {
  switch (action.type) {
    case ActionTypes.SET_NAME_FOR_ID:
      ProfileStore.setNameForId(action.name, action.id)
      break

    case ActionTypes.RECEIVE_NAME_FOR_ID:
      ProfileStore.receiveNameForId(action.name, action.id)
      break
  }
})

export { ProfileStore as default }
