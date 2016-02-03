import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../redux/modules/stats'
import UserStatsChart from './UserStatsChart.js'

const mapStateToProps = (state) => ({
  stats: state.stats,
  selectedUser: state.stats.selectedUser
})

class UserStatsPanel extends React.Component {
  static propTypes = {
    stats: PropTypes.object,
    fetchUsers: PropTypes.func,
    fetchUserStats: PropTypes.func,
    selectUserAndFetch: PropTypes.func,
    selectGranularityAndFetch: PropTypes.func
  };
  componentDidMount () {
    this.props.fetchUsers()
    setInterval(() => {
      this.props.fetchUsers()
    }, 60000)
  }
  render () {
    const {stats} = this.props
    return (
      <div>
        <h2>User Stats (All Channels)</h2>
        <div>
          <UserStatsChart
            data={stats.users}
            userList={stats.userList}
          />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(UserStatsPanel)
