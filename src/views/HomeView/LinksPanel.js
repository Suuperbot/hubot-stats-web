import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../redux/modules/stats';

const mapStateToProps = (state) => ({
  urls: state.stats.urls
});

class LinksPanel extends React.Component {
  static propTypes = {
    urls: PropTypes.array
  };
  render () {
    const {urls} = this.props;
    return (
      <div>
        <h2>Recent Links</h2>
        <ul style={{height: '500px', overflow: 'scroll'}}>
          {urls.map((url) => {
            return (
              <li key={url.when}>
                <a href={url.url}>{url.title || url.url}</a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, actions)(LinksPanel);
