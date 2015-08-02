import assign from 'object-assign'
import EventEmitter from '../modules/event-emitter'
import grillDispatcher from '../dispatchers/grill-dispatcher'
import ActionTypes from '../constants/action-types'
import PeerStore from './peer-store'
import askForMedia from '../modules/ask-for-media'
import CallActions from '../actions/call-actions'

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

    call.on('close', () => {
      // If we receive a normal "end call," this will try to fire during a dispatch.
      setTimeout(() => {
        if (CallStore.hasCall()) CallActions.receiveEndCall()
      })
    })

    call.on('error', (err) => {
      console.log('TODO: handle call error', err)
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

  endCall() {
    if (this.localStream) {
      this.localStream.stop()
      this.localStream = null
    }

    if (this.remoteStream) {
      this.remoteStream.stop()
      this.remoteStream = null
    }

    if (this.call) {
      this.call.close()
      this.call = null
    }

    this.emitChange()
  },
})

CallStore.dispatchToken = grillDispatcher.register(action => {
  console.log(action.type)

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

    case ActionTypes.END_CALL:
      CallStore.endCall()
      break

    case ActionTypes.RECEIVE_END_CALL:
      CallStore.endCall()
      break
  }
})

export { CallStore as default }
