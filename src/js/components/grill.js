import React from 'react'
import { addons } from 'react/addons'
import PeerStore from '../stores/peer-store'
import ConnectionStore from '../stores/connection-store'
import WaitForFriend from './wait-for-friend'
import ChillZone from './chill-zone'

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
    return ready ? (redirect) : (<h1>GRILL</h1>)
  }
}
