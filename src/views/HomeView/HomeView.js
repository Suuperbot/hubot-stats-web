import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions, GRANULARITIES } from '../../redux/modules/stats'
import RoomChart from './RoomChart.js'
import cx from 'classnames'

const mapStateToProps = (state) => ({
  stats: state.stats,
  selectedRoom: state.stats.selectedRoom
})
export class HomeView extends React.Component {
  static propTypes = {
    stats: PropTypes.object,
    selectedRoom: PropTypes.string,
    fetchRooms: PropTypes.func,
    fetchRoomStats: PropTypes.func,
    selectRoomAndFetch: PropTypes.func,
    selectGranularityAndFetch: PropTypes.func
  };

  componentDidMount () {
    this.props.fetchRooms()
    setInterval(() => {
      this.props.fetchRooms()
    }, 60000)
  }

  render () {
    const {stats, selectedRoom, selectRoomAndFetch, selectGranularityAndFetch} = this.props
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <h2>Channel Stats</h2>
            <div>
              <h2>#{selectedRoom}</h2>
              {GRANULARITIES.map((g) => {
                return (
                  <button
                    key={g.id}
                    onClick={() => selectGranularityAndFetch(g.id)}
                    className={cx({
                      btn: true,
                      'btn-primary': g.id === stats.selectedGranularity,
                      'btn-default': g.id !== stats.selectedGranularity
                    })}
                  >
                    {g.name}
                  </button>
                )
              })}
              <RoomChart
                data={stats.rooms[selectedRoom]}
              />
              <ul>
              {stats.roomList.map((room) => {
                return (
                  <li key={room}>
                    <a onClick={() => selectRoomAndFetch(room)}>
                      #{room} ({stats.rooms[room] ? stats.rooms[room].total : 0} messages)
                    </a>
                  </li>
                )
              })}
              </ul>
            </div>
          </div>
          <div className='col-md-6'>
          {/* <h2>Recent Links</h2> */}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(HomeView)
