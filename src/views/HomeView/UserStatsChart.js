import React, { PropTypes } from 'react';
import d3 from 'd3';
import _ from 'lodash';

import {AreaStackChart} from 'react-d3-basic';

class UserStatsChart extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    userList: PropTypes.array
  };
  render () {
    const {data, userList} = this.props;
    const chartSeries = [];
    const chartData = [];
    _.each(data, (user, userName) => {
      chartSeries.push({
        field: userName
      });
      _.each(user.activity, (chunk) => {
        let timestamp = chunk[0] * 1000;
        let value = chunk[1] || 0;
        let index = _.findIndex(chartData, {timestamp: timestamp});
        if (index !== -1) {
          chartData[index][userName] = value;
        } else {
          let item = {};
          item.timestamp = timestamp;
          _.each(userList, (name) => {
            item[name] = 0;
          });
          item[userName] = value;
          chartData.push(item);
        }
      });
    });
    return (
      <AreaStackChart
        data={chartData}
        width={1100}
        height={500}
        margins={{
          top: 100,
          bottom: 60,
          right: 25,
          left: 50
        }}
        chartSeries={chartSeries}
        x={(d) => d.timestamp}
        xScale='time'
        innerTickSize={20}
        categoricalColors={d3.scale.category20()}
      />
    );
  }
}

export default UserStatsChart;
