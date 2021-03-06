import i18next from 'i18next'

import FitTrackeeApi from '../fitTrackeeApi/index'
import { history } from '../index'

export const setData = (target, data) => ({
  type: 'SET_DATA',
  data,
  target,
})

export const setError = message => ({
  type: 'SET_ERROR',
  message,
})

export const setLanguage = language => ({
  type: 'SET_LANGUAGE',
  language,
})

export const setLoading = loading => ({
  type: 'SET_LOADING',
  loading,
})

export const getOrUpdateData = (action, target, data) => dispatch => {
  dispatch(setLoading(true))
  if (data && data.id && isNaN(data.id)) {
    dispatch(setLoading(false))
    return dispatch(setError(`${target}|Incorrect id`))
  }
  return FitTrackeeApi[action](target, data)
    .then(ret => {
      if (ret.status === 'success') {
        dispatch(setData(target, ret.data))
      } else {
        dispatch(setError(`${target}|${ret.message || ret.status}`))
      }
      dispatch(setLoading(false))
    })
    .catch(error => {
      dispatch(setLoading(false))
      dispatch(setError(`${target}|${error}`))
    })
}

export const addData = (target, data) => dispatch =>
  FitTrackeeApi.addData(target, data)
    .then(ret => {
      if (ret.status === 'created') {
        history.push(`/admin/${target}`)
      } else {
        dispatch(setError(`${target}|${ret.status}`))
      }
    })
    .catch(error => dispatch(setError(`${target}|${error}`)))

export const deleteData = (target, id) => dispatch => {
  if (isNaN(id)) {
    return dispatch(setError(target, `${target}|Incorrect id`))
  }
  return FitTrackeeApi.deleteData(target, id)
    .then(ret => {
      if (ret.status === 204) {
        history.push(`/admin/${target}`)
      } else {
        dispatch(setError(`${target}|${ret.message || ret.status}`))
      }
    })
    .catch(error => dispatch(setError(`${target}|${error}`)))
}

export const updateLanguage = language => dispatch => {
  i18next.changeLanguage(language).then(dispatch(setLanguage(language)))
}
