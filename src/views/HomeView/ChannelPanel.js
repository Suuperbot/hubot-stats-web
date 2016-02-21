import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../redux/modules/stats';

import RoomChart from './RoomChart';

const mapStateToProps = (state) => ({
  stats: state.stats,
  selectedRoom: state.stats.selectedRoom
});

class ChannelPanel extends React.Component {
  static propTypes = {
    stats: PropTypes.object,
    selectedRoom: PropTypes.string,
    fetchRooms: PropTypes.func,
    fetchRoomStats: PropTypes.func,
    selectRoomAndFetch: PropTypes.func
  };
  render () {
    const {stats, selectedRoom} = this.props;
    return (
      <div>
        <RoomChart
          data={stats.rooms[selectedRoom]}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, actions)(ChannelPanel);
