var key = 'n5l6va0xfzaaif6r';

var peer = new Peer({key: key});

var myId = document.getElementById('my-id');
peer.on('open', function (id) {
  console.log('open', id);
  var text = document.createTextNode(id);
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
  var li = document.createElement('li');
  if (opts.className) {
    li.className = opts.className;
  }
  var text = document.createTextNode(opts.text);
  li.appendChild(text);
  return li;
}


var connectionForm = document.getElementById('create-connection-form');
var friendId = document.getElementById('friend-id-input');

connectionForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var connection = peer.connect(friendId.value);
  friendId.value = '';
  connect(connection);
});


var sendData = document.getElementById('send-data-form');
var messageInput = document.getElementById('message-input');

var messageList = document.getElementById('message-list');
