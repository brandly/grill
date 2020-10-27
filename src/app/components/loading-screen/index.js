import './index.css'
import React from 'react'

export default class LoadingScreen extends React.Component {
  render() {
    return (
      <div className="loading-screen fullscreen-overlay faded-bg">
        <h1 className="absolute-center">Grill</h1>
      </div>
    )
  }
}
