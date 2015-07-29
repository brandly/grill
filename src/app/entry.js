import './reset.css'
import './global.css'
import React from 'react'
import Modal from 'react-modal'
import Grill from './components/grill'

const mainElement = document.getElementById('main')
Modal.setAppElement(mainElement)

React.render(
  <Grill />,
  mainElement
)
