import assign from 'object-assign'
import webrtcSupport from 'webrtcsupport'
import Peer from 'peerjs'
import queryString from 'query-string'
import EventEmitter from '../modules/event-emitter'
import grillDispatcher from '../dispatchers/grill-dispatcher'
import ActionTypes from '../constants/action-types'
import PeerActions from '../actions/peer-actions'
import SupportActions from '../actions/support-actions'

if (!webrtcSupport.support) {
  SupportActions.noSupport()
}

const qs = queryString.parse(location.search)

const key = 'n5l6va0xfzaaif6r'
const peer = new Peer({ key })

peer.on('open', function (id) {
  PeerActions.receivePeerId(id)

  if (PeerStore.getFriendId()) {
    const connection = peer.connect(PeerStore.getFriendId())
    PeerActions.establishConnection(connection)
  }
})

peer.on('connection', function (connection) {
  PeerStore.friendId = connection.peer
  PeerActions.establishConnection(connection)
})

peer.on('call', function (call) {
  PeerActions.receiveCall(call)
})

peer.on('error', function (err) {
  console.log('errrrr', err)

  // TODO: REMOVE THIS NONSENSE
  if (err.type === 'network') {
    PeerActions.receivePeerId('ayyyyyy')
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~

  switch (err.type) {
    case 'browser-incompatible':
      SupportActions.noSupport()
      break

    case 'network':
      console.log('TODO: handle network failure')
      break

    case 'peer-unavailable':
      console.log('TODO: handle peer-unavailable')
      break

    case 'socket-error':
      console.log('TODO: handle error from underlying socket')
      break

    case 'socket-closed':
      console.log('TODO: handle socket closing unexpectedly')
      break

    case 'webrtc':
      console.log('TODO: handle native webrtc errors')
      break
  }
})

peer.on('close', function () {
  console.log('TODO: handle peer close')
})

const PeerStore = assign({}, EventEmitter, {
  id: null,
  friendId: qs.g,

  setId(id) {
    this.id = id
    this.emitChange()
  },

  getId() {
    return this.id
  },

  getFriendId() {
    return this.friendId
  },

  hasPeer() {
    return !!this.id
  },

  createCall(stream) {
    return peer.call(this.friendId, stream)
  },
})

PeerStore.dispatchToken = grillDispatcher.register(action => {
  switch (action.type) {
    case ActionTypes.RECEIVE_PEER_ID:
      PeerStore.setId(action.id)
      break
  }
})

export { PeerStore as default }
