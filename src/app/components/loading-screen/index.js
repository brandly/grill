import './index.css'
import React from 'react'
import { addons } from 'react/addons'

export default class LoadingScreen extends React.Component {
  mixins: [addons.PureRenderMixin]

  render() {
    return (
      <div className="loading-screen fullscreen-overlay faded-bg">
        <h1 className="absolute-center">Grill</h1>
      </div>
    )
  }
}
