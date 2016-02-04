import React from 'react'

import ChannelPanel from './ChannelPanel'
import UserStatsPanel from './UserStatsPanel'
import LinksPanel from './LinksPanel'
import ImagesPanel from './ImagesPanel'

export class HomeView extends React.Component {

  render () {
    return (
      <div className='container'>

        <div className='row'>
          <div className='col-md-6'>
            <ChannelPanel />
          </div>

          <div className='col-md-6'>
            <LinksPanel />
          </div>
        </div>

        <div className='row'>
          <div className='col-md-6'>
            <UserStatsPanel />
          </div>

          <div className='col-md-6'>
            <ImagesPanel />
          </div>
        </div>

      </div>
    )
  }
}

export default HomeView
