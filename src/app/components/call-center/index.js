import './index.css'
import React from 'react'
const { useRef, useEffect } = React
import InlineSvg from 'react-inlinesvg'
import PeerActions from '../../actions/peer-actions'
import CallActions from '../../actions/call-actions'
import CallStore from '../../stores/call-store'
import closeSvg from './close.svg'

export default class CallCenter extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getState()
  }

  getState() {
    return {
      isVideoChatting: CallStore.isVideoChatting(),
      localStream: CallStore.getLocalStream(),
      remoteStream: CallStore.getRemoteStream()
    }
  }

  componentWillMount() {
    this._onChange = () => {
      this.setState(this.getState())
    }
    CallStore.addChangeListener(this._onChange)
  }

  componentWillUnmount() {
    CallStore.removeChangeListener(this._onChange)
  }

  endCall() {
    CallActions.endCall()
  }

  render() {
    const { isVideoChatting, localStream, remoteStream } = this.state

    if (!isVideoChatting) {
      return null
    }

    return (
      <div className="call-center">
        <Video
          className="friend-video"
          videoProps={{ autoPlay: true }}
          src={remoteStream}
        />
        <Video
          className="my-video"
          videoProps={{ autoPlay: true, muted: true }}
          src={localStream}
        />
        <button className="end-call-button" onClick={this.endCall.bind(this)}>
          <InlineSvg src={closeSvg}></InlineSvg>
        </button>
      </div>
    )
  }
}

const Video = ({ className, videoProps, src }) => {
  const ref = useRef(null)
  useEffect(() => {
    ref.current.srcObject = src
  }, [src.id])
  return <video className={className} {...videoProps} ref={ref}></video>
}
