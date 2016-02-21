import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../redux/modules/stats';
import UserStatsChart from './UserStatsChart.js';

const mapStateToProps = (state) => ({
  stats: state.stats,
  selectedUser: state.stats.selectedUser
});

class UserStatsPanel extends React.Component {
  static propTypes = {
    stats: PropTypes.object,
    fetchUsers: PropTypes.func,
    fetchUserStats: PropTypes.func,
    selectUserAndFetch: PropTypes.func,
    selectGranularityAndFetch: PropTypes.func
  };
  render () {
    const {stats} = this.props;
    return (
      <div>
        <UserStatsChart
          data={stats.users}
          userList={stats.userList}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, actions)(UserStatsPanel);
