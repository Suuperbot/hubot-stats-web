import React, { PropTypes } from 'react'
import {LineChart} from 'react-d3-basic'

import classes from './RoomChart.scss'

class RoomChart extends React.Component {
  static propTypes = {
    data: PropTypes.object
  };
  render () {
    const {data} = this.props
    let activity = []
    if (data && data.activity) {
      activity = data.activity
    }
    const chartData = activity.map((chunk) => {
      return {
        timestamp: new Date(chunk[0] * 1000),
        messages: chunk[1]
      }
    })
    const width = 550
    return (
      <LineChart
        data={chartData}
        width={width}
        height={300}
        margins={{
          top: 25,
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
    )
  }
}

export default RoomChart
