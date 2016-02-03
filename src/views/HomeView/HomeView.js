import React from 'react'

import ChannelPanel from './ChannelPanel'
import UserStatsPanel from './UserStatsPanel'

export class HomeView extends React.Component {

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <ChannelPanel />
          </div>
          <div className='col-md-6'>
          {/* <h2>Recent Links</h2> */}
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <UserStatsPanel />
          </div>
          <div className='col-md-6'>
          {/* <h2>Recent Images</h2> */}
          </div>
        </div>
      </div>
    )
  }
}

export default HomeView
