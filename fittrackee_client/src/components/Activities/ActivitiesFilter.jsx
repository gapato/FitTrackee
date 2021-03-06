import React from 'react'

import { translateSports } from '../../utils/activities'

export default class ActivitiesFilter extends React.PureComponent {
  render() {
    const { loadActivities, sports, t, updateParams } = this.props
    const translatedSports = translateSports(sports, t)
    return (
      <div className="card">
        <div className="card-body activity-filter">
          <form onSubmit={event => event.preventDefault()}>
            <div className="form-group">
              <label>
                {t('activities:From')}:
                <input
                  className="form-control col-md"
                  name="from"
                  onChange={e => updateParams(e)}
                  type="date"
                />
              </label>
              <label>
                {t('activities:To')}:
                <input
                  className="form-control col-md"
                  name="to"
                  onChange={e => updateParams(e)}
                  type="date"
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                {t('common:Sport')}:
                <select
                  className="form-control input-lg"
                  name="sport_id"
                  onChange={e => updateParams(e)}
                >
                  <option value="" />
                  {translatedSports.map(sport => (
                    <option key={sport.id} value={sport.id}>
                      {sport.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-group">
              <label>
                {t('activities:Distance')} (km):
                <div className="container">
                  <div className="row">
                    <div className="col-5">
                      <input
                        className="form-control"
                        min={0}
                        name="distance_from"
                        onChange={e => updateParams(e)}
                        step="1"
                        type="number"
                      />
                    </div>
                    <div className="col-2 align-middle text-center">
                      {t('common:to')}
                    </div>
                    <div className="col-5">
                      <input
                        className="form-control"
                        min={0}
                        name="distance_to"
                        onChange={e => updateParams(e)}
                        step="1"
                        type="number"
                      />
                    </div>
                  </div>
                </div>
              </label>
            </div>
            <div className="form-group">
              <label>
                {t('activities:Duration')}:
                <div className="container">
                  <div className="row">
                    <div className="col-5">
                      <input
                        className="form-control"
                        name="duration_from"
                        onChange={e => updateParams(e)}
                        pattern="^([0-9]*[0-9]):([0-5][0-9])$"
                        placeholder="hh:mm"
                        type="text"
                      />
                    </div>
                    <div className="col-2 align-middle text-center">
                      {t('common:to')}
                    </div>
                    <div className="col-5">
                      <input
                        className="form-control"
                        name="duration_to"
                        onChange={e => updateParams(e)}
                        pattern="^([0-9]*[0-9]):([0-5][0-9])$"
                        placeholder="hh:mm"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </label>
            </div>
            <div className="form-group">
              <label>
                {t('activities:Average speed')} (km/h):
                <div className="container">
                  <div className="row">
                    <div className="col-5">
                      <input
                        className="form-control"
                        min={0}
                        name="ave_speed_from"
                        onChange={e => updateParams(e)}
                        step="1"
                        type="number"
                      />
                    </div>
                    <div className="col-2 align-middle text-center">
                      {t('common:to')}
                    </div>
                    <div className="col-5">
                      <input
                        className="form-control"
                        min={0}
                        name="ave_speed_to"
                        onChange={e => updateParams(e)}
                        step="1"
                        type="number"
                      />
                    </div>
                  </div>
                </div>
              </label>
            </div>
            <div className="form-group">
              <label>
                {t('activities:Max. speed')} (km/h):
                <div className="container">
                  <div className="row">
                    <div className="col-5">
                      <input
                        className="form-control"
                        min={0}
                        name="max_speed_from"
                        onChange={e => updateParams(e)}
                        step="1"
                        type="number"
                      />
                    </div>
                    <div className="col-2 align-middle text-center">
                      {t('common:to')}
                    </div>
                    <div className="col-5">
                      <input
                        className="form-control"
                        min={0}
                        name="max_speed_to"
                        onChange={e => updateParams(e)}
                        step="1"
                        type="number"
                      />
                    </div>
                  </div>
                </div>
              </label>
            </div>
            <input
              className="btn btn-primary btn-lg btn-block"
              onClick={() => loadActivities()}
              type="submit"
              value={t('activities:Filter')}
            />
          </form>
        </div>
      </div>
    )
  }
}
