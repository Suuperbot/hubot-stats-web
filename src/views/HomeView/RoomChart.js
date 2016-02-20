import React, { PropTypes } from 'react';
import {LineChart} from 'react-d3-basic';

class RoomChart extends React.Component {
  static propTypes = {
    data: PropTypes.object
  };
  render () {
    const {data} = this.props;
    let activity = [];
    if (data && data.activity) {
      activity = data.activity;
    }
    const chartData = activity.map((chunk) => {
      return {
        timestamp: new Date(chunk[0] * 1000),
        messages: chunk[1]
      };
    });
    return (
      <LineChart
        data={chartData}
        width={550}
        height={400}
        margins={{
          top: 100,
          bottom: 60,
          right: 25,
          left: 50
        }}
        chartSeries={[
          {
            field: 'messages',
            name: 'Messages',
            color: '#ff7600',
            style: {
              'stroke-width': 2.5
            }
          }
        ]}
        x={(d) => d.timestamp}
        xScale='time'
        innerTickSize={20}
      />
    );
  }
}

export default RoomChart;
