import React from 'react'

import { apiUrl } from '../../utils'

export default class StaticMap extends React.PureComponent {
  render() {
    const { activity, display } = this.props

    return (
      <div className={`activity-map${display === 'list' ? '-list' : ''}`}>
        <img
          src={`${apiUrl}activities/map/${activity.map}?${Date.now()}`}
          alt="activity map"
        />
        <div className={`map-attribution${display === 'list' ? '-list' : ''}`}>
          <span className="map-attribution-text">©</span>
          <a
            className="map-attribution-text"
            href="http://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenStreetMap
          </a>
        </div>
      </div>
    )
  }
}
