import getUserMedia from 'getusermedia'

export default function askForMedia(cb) {
  getUserMedia({ audio: true, video: true }, cb)
}
