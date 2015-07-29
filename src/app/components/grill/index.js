import './index.css'
import React from 'react'
import { addons } from 'react/addons'
import PeerStore from '../../stores/peer-store'
import ConnectionStore from '../../stores/connection-store'
import WaitForFriend from '../wait-for-friend'
import ChillZone from '../chill-zone'
import LoadingScreen from '../loading-screen'

export default class Grill extends React.Component {
  mixins: [addons.PureRenderMixin]

  constructor(props) {
    super(props)
    this.state = {
      ready: false,
      friendIsWaiting: this.isFriendWaiting()
    }
  }

  isFriendWaiting() {
    return !!PeerStore.getFriendId() || !!ConnectionStore.getConnection()
  }

  componentWillMount() {
    PeerStore.addChangeListener(() => {
      this.setState({
        friendIsWaiting: this.isFriendWaiting(),
        ready: !!PeerStore.getId()
      })
    })

    ConnectionStore.addChangeListener(() => {
      this.setState({
        friendIsWaiting: this.isFriendWaiting()
      })
    })
  }

  render() {
    const { ready, friendIsWaiting } = this.state
    const redirect = friendIsWaiting ? <ChillZone /> : <WaitForFriend />;

    if (ready) {
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
