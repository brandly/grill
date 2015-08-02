import keyMirror from 'keymirror'

const types = keyMirror({
  RECEIVE_PEER_ID: null,

  SEND_TEXT: null,
  RECEIVE_TEXT: null,
  ESTABLISH_CONNECTION: null,
  CLOSE_CONNECTION: null,

  INITIATE_CALL: null,
  RECEIVE_CALL: null,
  ACCEPT_CALL: null,
  END_CALL: null,
  RECEIVE_END_CALL: null,

  SET_NAME_FOR_ID: null,
  NO_SUPPORT: null,

  BEGIN_TYPING: null,
  RECEIVE_BEGIN_TYPING: null,
  STOP_TYPING: null,
  RECEIVE_STOP_TYPING: null,
})

export { types as default }
