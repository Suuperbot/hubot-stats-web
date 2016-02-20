import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../redux/modules/stats'

const mapStateToProps = (state) => ({
  roomList: state.stats.roomList,
  selectedRoom: state.stats.selectedRoom,
  fetchRooms: state.stats.fetchRooms
})

class ChannelChooser extends React.Component {
  static propTypes = {
    roomList: PropTypes.array,
    selectRoomAndFetch: PropTypes.func,
    fetchRooms: PropTypes.func,
    selectedRoom: PropTypes.string
  };
  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }
  componentDidMount () {
    this.props.fetchRooms()
    setInterval(() => {
      this.props.fetchRooms()
    }, 60000)
  }
  onChange (event) {
    this.props.selectRoomAndFetch(event.target.value)
  }
  render () {
    const {roomList, selectedRoom} = this.props
    return (
      <select value={selectedRoom} onChange={this.onChange}>
        {roomList.map((room) => {
          return (
            <option key={room} value={room}>#{room}</option>
          )
        })}
      </select>
    )
  }
}

export default connect(mapStateToProps, actions)(ChannelChooser)
