import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../redux/modules/stats'

const mapStateToProps = (state) => ({
  images: state.stats.images
})

class LinksPanel extends React.Component {
  static propTypes = {
    images: PropTypes.array,
    fetchImages: PropTypes.func
  };
  componentDidMount () {
    this.props.fetchImages()
    setInterval(() => {
      this.props.fetchImages()
    }, 60000)
  }
  render () {
    const {images} = this.props
    return (
      <div>
        <h2>Recent Images</h2>
        <ul>
          {images.map((image) => {
            return (
              <li key={image.url}>
                <img src={image.url} />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(LinksPanel)
