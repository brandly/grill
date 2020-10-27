import assign from 'object-assign'
import EventEmitter from '../modules/event-emitter'
import grillDispatcher from '../dispatchers/grill-dispatcher'
import ActionTypes from '../constants/action-types'
import Notify from 'notifyjs'
import Visibility from 'visibilityjs'

if (Notify.isSupported) {
  Notify.requestPermission(() => {
    NotificationStore.isPermitted = true
  })
}

Visibility.change((e, value) => {
  NotificationStore.isVisible = value === 'visible'
})

const NotificationStore = assign({}, EventEmitter, {
  isSupported: Notify.isSupported,
  isPermitted: false,
  isVisible: true,

  textNotification(text) {
    this._notify('New Message', text)
  },

  callNotification() {
    this._notify('Ring Ring', 'Your friend wants to video chat')
  },

  _notify(title, body) {
    if (!this._shouldSend()) return
    const notif = new Notify(title, {
      body: body,
      timeout: 4
    })
    notif.show()
  },

  _shouldSend() {
    return this.isSupported && this.isPermitted && !this.isVisible
  }
})

NotificationStore.dispatchToken = grillDispatcher.register((action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_TEXT:
      NotificationStore.textNotification(action.text)
      break

    case ActionTypes.RECEIVE_CALL:
      NotificationStore.callNotification()
      break
  }
})

export { NotificationStore as default }
