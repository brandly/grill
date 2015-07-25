import keyMirror from 'keymirror'

const types = keyMirror({
  RECEIVE_PEER_ID: null,
  SEND_TEXT: null,
  RECEIVE_TEXT: null,
  ESTABLISH_CONNECTION: null,
  INITIATE_CALL: null,
  RECEIVE_CALL: null,
  ACCEPT_CALL: null,
  SET_NAME_FOR_ID: null,
})

export { types as default }
