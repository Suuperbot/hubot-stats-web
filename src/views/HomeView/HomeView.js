import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import TimespanChooser from './TimespanChooser';
import ChannelChooser from './ChannelChooser';
import UserStatsPanel from './UserStatsPanel';
import LinksPanel from './LinksPanel';
import ImagesPanel from './ImagesPanel';

import {fetchRoomStats, fetchRooms, fetchImages, fetchUrls} from '../../redux/modules/stats';

export class HomeView extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func
  };

  componentDidMount () {
    this.props.dispatch(fetchRoomStats());
    this.props.dispatch(fetchRooms());
    this.props.dispatch(fetchImages());
    this.props.dispatch(fetchUrls());
    setInterval(() => {
      this.props.dispatch(fetchRoomStats());
      this.props.dispatch(fetchRooms());
      this.props.dispatch(fetchImages());
      this.props.dispatch(fetchUrls());
    }, 60000);
  }
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

export default connect()(HomeView);
