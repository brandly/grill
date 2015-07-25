import assign from 'object-assign'
import Peer from 'peerjs'
import queryString from 'query-string'
import EventEmitter from '../modules/event-emitter'
import grillDispatcher from '../dispatchers/grill-dispatcher'
import ActionTypes from '../constants/action-types'
import PeerActions from '../actions/peer-actions'

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
  if (err == 'Error: Could not get an ID from the server.') {
    // PeerActions.receivePeerId('ayyyyyy')
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~
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
