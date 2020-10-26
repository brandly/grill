import './index.css'
import React from 'react'
import PeerStore from '../../stores/peer-store'
import ConnectionStore from '../../stores/connection-store'
import WaitForFriend from '../wait-for-friend'
import ChillZone from '../chill-zone'
import LoadingScreen from '../loading-screen'

export default class Grill extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getState()
  }

  getState() {
    return {
      friendIsWaiting: this.isFriendWaiting(),
      peerReady: !!PeerStore.getId(),
      connectionOpen: ConnectionStore.isOpen(),
    }
  }

  isFriendWaiting() {
    return !!PeerStore.getFriendId() || !!ConnectionStore.getConnection()
  }

  componentWillMount() {
    [PeerStore, ConnectionStore].forEach((store) => {
      store.addChangeListener(() => {
        this.setState(this.getState())
      })
    })
  }

  render() {
    const { peerReady, friendIsWaiting, connectionOpen } = this.state
    const chillZoneProps = { connectionOpen }
    const redirect = friendIsWaiting ? <ChillZone {...chillZoneProps} /> : <WaitForFriend />;

    if (peerReady) {
      return (
        <div>
          <header className="fixed-header"><h1 className="header-title">Grill</h1></header>
          <div className="under-header">
            {redirect}
          </div>


        </div>
      )
    } else {
      return (
        <LoadingScreen />
      )
    }
  }
}
