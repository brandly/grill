import assign from 'object-assign'
import EventEmitter from '../modules/event-emitter'
import grillDispatcher from '../dispatchers/grill-dispatcher'
import ActionTypes from '../constants/action-types'
import PeerStore from './peer-store'
import askForMedia from '../modules/ask-for-media'

const CallStore = assign({}, EventEmitter, {
  call: null,
  localStream: null,
  remoteStream: null,

  hasCall() {
    return !!this.call
  },

  isReceivingCall() {
    return !!this.call && !this.remoteStream && !this.localStream
  },

  isCallingFriend() {
    return !!this.call && !!this.localStream && !this.remoteStream
  },

  isVideoChatting() {
    return !!this.call && !!this.localStream && !!this.remoteStream
  },

  setCall(call) {
    this.call = call

    call.on('stream', (stream) => {
      this.remoteStream = stream
      this.emitChange()
    })

    this.emitChange()
  },

  initiateCall(stream) {
    this.localStream = stream
    this.setCall(PeerStore.createCall(stream))
  },

  acceptCall(stream) {
    this.call.answer(stream)
    this.setLocalStream(stream)
  },

  setLocalStream(stream) {
    this.localStream = stream
    this.emitChange()
  },

  getLocalStream() {
    return this.localStream
  },

  getRemoteStream() {
    return this.remoteStream
  },
})

CallStore.dispatchToken = grillDispatcher.register(action => {
  switch (action.type) {
    case ActionTypes.INITIATE_CALL:
      askForMedia(function (err, stream) {
        if (err) {
          console.log('TODO: handle media denial', err)
        } else {
          CallStore.initiateCall(stream)
        }
      })
      break

    case ActionTypes.RECEIVE_CALL:
      CallStore.setCall(action.call)
      break

    case ActionTypes.ACCEPT_CALL:
      askForMedia(function (err, stream) {
        if (err) {
          console.log('TODO: handle media denial', err)
        } else {
          CallStore.acceptCall(stream)
        }
      })
      break
  }
})

export { CallStore as default }
