import React from 'react'
import { addons } from 'react/addons'
import PeerStore from '../../stores/peer-store'
import ConnectionStore from '../../stores/connection-store'
import TextChat from '../text-chat'
import CallCenter from '../call-center'

export default class ChillZone extends React.Component {
  mixins: [addons.PureRenderMixin]

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    // PeerStore.addChangeListener(() => {
    //   this.setState({
    //     ready: !!PeerStore.getId()
    //   })
    // })
  }

  render() {
    return (
      <div>
        <TextChat />
        <CallCenter />
      </div>
    )
  }
}
