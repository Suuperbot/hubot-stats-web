import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../redux/modules/stats'

const mapStateToProps = (state) => ({
  urls: state.stats.urls
})

class LinksPanel extends React.Component {
  static propTypes = {
    urls: PropTypes.array,
    fetchUrls: PropTypes.func
  };
  componentDidMount () {
    this.props.fetchUrls()
    setInterval(() => {
      this.props.fetchUrls()
    }, 60000)
  }
  render () {
    const {urls} = this.props
    return (
      <div>
        <h2>Recent Links</h2>
        <ul>
          {urls.map((url) => {
            return (
              <li key={url.url}>
                <a href={url.url}>{url.url}</a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(LinksPanel)
