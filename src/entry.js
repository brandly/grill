import Peer from 'peerjs';
import getUserMedia from 'getusermedia';

const key = 'n5l6va0xfzaaif6r';
const peer = new Peer({key: key});

const myId = document.getElementById('my-id');
peer.on('open', function (id) {
  console.log('open', id);
  const text = document.createTextNode(id);
  myId.appendChild(text);
});

peer.on('connection', function (connection) {
  console.log('connected to', connection.peer);
  connect(connection);
});

function connect(connection) {
  connection.on('open', function () {
    console.log('OPEN');
    connectionForm.style.display = 'none';

    connection.on('data', function (data) {
      messageList.appendChild(createListItem({
        text: data,
        className: 'received'
      }));
    });

    sendData.addEventListener('submit', function (event) {
      event.preventDefault();
      connection.send(messageInput.value);
      messageList.appendChild(createListItem({
        text: messageInput.value,
        className: 'sent'
      }));
      messageInput.value = '';
    });
  });
}

function createListItem(opts) {
  const li = document.createElement('li');
  if (opts.className) {
    li.className = opts.className;
  }
  const text = document.createTextNode(opts.text);
  li.appendChild(text);
  return li;
}

const connectionForm = document.getElementById('create-connection-form');
const friendId = document.getElementById('friend-id-input');

let FRIEND = null;

connectionForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const connection = peer.connect(friendId.value);
  connect(connection);
  FRIEND = friendId.value;

  friendId.value = '';
});


const sendData = document.getElementById('send-data-form');
const messageInput = document.getElementById('message-input');

const messageList = document.getElementById('message-list');

peer.on('call', function (call) {
  console.log('callll', call);
  const shouldAnswer = confirm('answer it?');
  if (shouldAnswer) {
    askForMedia(function (stream) {
      waitForStream(call);
      call.answer(stream);
    });
  }
});

// i want to call
//   - allow video/audio
// calling...
// on answer, display incoming stream
const callButton = document.getElementById('call-button');

callButton.addEventListener('click', function (event) {
  event.preventDefault();

  console.log('requesting media');
  askForMedia(function (stream) {
    console.log('calling');
    const call = peer.call(FRIEND, stream);
    waitForStream(call);
  });
});

function waitForStream(call) {
  var remoteVideo = document.getElementById('remote-video');

  call.on('stream', function (stream) {
    remoteVideo.src = URL.createObjectURL(stream);
    remoteVideo.play();
  });
}

function askForMedia(cb) {
  getUserMedia({audio: true, video: true}, function (err, stream) {
    if (err) {
      console.log('problem getting user media', err);
    } else {
      cb(stream);
    }
  });
}
