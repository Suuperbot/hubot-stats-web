import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions, GRANULARITIES } from '../../redux/modules/stats';

import cx from 'classnames';

const mapStateToProps = (state) => ({
  selectedGranularity: state.stats.selectedGranularity,
  selectGranularityAndFetch: PropTypes.func
});

class TimespanChooser extends React.Component {
  static propTypes = {
    selectedGranularity: PropTypes.string,
    selectGranularityAndFetch: PropTypes.func
  };
  render () {
    const {selectedGranularity, selectGranularityAndFetch} = this.props;

    return (
      <div>
      {GRANULARITIES.map((g) => {
        return (
          <button
            key={g.id}
            onClick={() => selectGranularityAndFetch(g.id)}
            className={cx({
              btn: true,
              'btn-primary': g.id === selectedGranularity,
              'btn-default': g.id !== selectedGranularity
            })}
          >
            {g.name}
          </button>
        );
      })}
      </div>
    );
  }
}

export default connect(mapStateToProps, actions)(TimespanChooser);
