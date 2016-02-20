import React, { PropTypes } from 'react';
import LazyLoad from 'react-lazy-load';
import { connect } from 'react-redux';

import { actions } from '../../redux/modules/stats';

const mapStateToProps = (state) => ({
  images: state.stats.images
});

class ImagesPanel extends React.Component {
  static propTypes = {
    images: PropTypes.array,
    fetchImages: PropTypes.func
  };
  componentDidMount () {
    this.props.fetchImages();
    setInterval(() => {
      this.props.fetchImages();
    }, 60000);
  }
  render () {
    const {images} = this.props;
    return (
      <div>
        <h2>Recent Images</h2>
        <ul style={{height: '500px', overflow: 'scroll'}}>
          {images.map((image) => {
            return (
              <li key={image.when} style={{minHeight: '200px', padding: '2px'}}>
                <LazyLoad>
                  <img src={image.url} width={450}/>
                </LazyLoad>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, actions)(ImagesPanel);
