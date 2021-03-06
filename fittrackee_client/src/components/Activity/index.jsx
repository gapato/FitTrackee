import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'

import ActivityAdd from './ActivityAdd'
import ActivityDisplay from './ActivityDisplay'
import ActivityEdit from './ActivityEdit'
import NotFound from './../Others/NotFound'
import { isLoggedIn } from '../../utils'

function Activity() {
  return (
    <div>
      {isLoggedIn() ? (
        <Switch>
          <Route exact path="/activities/add" component={ActivityAdd} />
          <Route
            exact
            path="/activities/:activityId"
            component={ActivityDisplay}
          />
          <Route
            exact
            path="/activities/:activityId/edit"
            component={ActivityEdit}
          />
          <Route
            path="/activities/:activityId/segment/:segmentId"
            component={ActivityDisplay}
          />
          <Route component={NotFound} />
        </Switch>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  )
}

export default connect(state => ({
  user: state.user,
}))(Activity)
