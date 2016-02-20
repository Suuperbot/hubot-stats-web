import React from 'react';

import TimespanChooser from './TimespanChooser';
import ChannelChooser from './ChannelChooser';
import UserStatsPanel from './UserStatsPanel';
import LinksPanel from './LinksPanel';
import ImagesPanel from './ImagesPanel';

export class HomeView extends React.Component {

  render () {
    return (
      <div className='container'>

        <div className='row'>
          <h2>Channel Stats</h2>
          <div className='col-md-4'>
            <TimespanChooser />
          </div>
          <div className='col-md-6'>
            <ChannelChooser />
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <UserStatsPanel />
          </div>
        </div>

        <div className='row'>
          <div className='col-md-6'>
            <LinksPanel />
          </div>
          <div className='col-md-6'>
            <ImagesPanel />
          </div>
        </div>

      </div>
    );
  }
}

export default HomeView;
