import React from 'react'
import UnionSvg from '../UnionSvg'

import './style.scss'

export default ({ message, error }) => {
  return <div className='crash'>
    <div className='crash-overlay'/>
    <div className='crash-window'>
      <UnionSvg className='crash-window' fill='#e74c3c'/>
      <div className='crash-window-contents'>
        <div className='crash-window-contents-title'>Union has crashed</div>
        <div className='crash-window-contents-message'>{message}</div>
        <div className='crash-window-contents-error'>{error.message}</div>
      </div>
      <div className='crash-window-footer'>
        <a href='https://github.com/Union-Chat'>Open an issue on GitHub</a>
        <a href='#' onClick={() => window.location.reload()}>Reload Union</a>
      </div>
    </div>
  </div>
}
