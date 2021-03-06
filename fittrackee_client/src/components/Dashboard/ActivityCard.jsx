import { format } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'

import StaticMap from '../Common/StaticMap'
import { getDateWithTZ } from '../../utils'

export default function ActivityCard(props) {
  const { activity, sports, t, user } = props

  return (
    <div className="card activity-card text-center">
      <div className="card-header">
        <Link to={`/activities/${activity.id}`}>
          {sports
            .filter(sport => sport.id === activity.sport_id)
            .map(sport => t(`sports:${sport.label}`))}{' '}
          -{' '}
          {format(
            getDateWithTZ(activity.activity_date, user.timezone),
            'dd/MM/yyyy HH:mm'
          )}
        </Link>
      </div>
      <div className="card-body">
        <div className="row">
          {activity.map && (
            <div className="col">
              <StaticMap activity={activity} />
            </div>
          )}
          <div className="col">
            <p>
              <i className="fa fa-clock-o" aria-hidden="true" />{' '}
              {t('activities:Duration')}: {activity.moving}
              {activity.map ? (
                <span>
                  <br />
                  <br />
                </span>
              ) : (
                ' - '
              )}
              <i className="fa fa-road" aria-hidden="true" />{' '}
              {t('activities:Distance')}: {activity.distance} km
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
