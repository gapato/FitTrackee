import { format, parse } from 'date-fns'
import { DateTime } from 'luxon'

const suffixes = ['bytes', 'KB', 'MB', 'GB', 'TB']
const getFileSize = fileSize => {
  const i = Math.floor(Math.log(fileSize) / Math.log(1024))
  return (
    (!fileSize && '0 bytes') ||
    `${(fileSize / Math.pow(1024, i)).toFixed(1)}${suffixes[i]}`
  )
}

export const version = '0.2.5-beta' // version stored in 'utils' for now
export const apiUrl = `${process.env.REACT_APP_API_URL}/api/`
/* prettier-ignore */
export const thunderforestApiKey = `${
  process.env.REACT_APP_THUNDERFOREST_API_KEY
}`
export const gpxLimit = `${process.env.REACT_APP_GPX_LIMIT_IMPORT}`
export const fileSizeLimit = getFileSize(
  +process.env.REACT_APP_MAX_SINGLE_FILE_SIZE
)
export const zipSizeLimit = getFileSize(
  +process.env.REACT_APP_MAX_ZIP_FILE_SIZE
)
export const isRegistrationAllowed =
  process.env.REACT_APP_ALLOW_REGISTRATION !== 'false'

export const isLoggedIn = () => !!window.localStorage.authToken

export const generateIds = arr => {
  let i = 0
  return arr.map(val => {
    const obj = { id: i, value: val }
    i++
    return obj
  })
}

export const createApiRequest = params => {
  const headers = {}
  if (!params.noAuthorization) {
    headers.Authorization = `Bearer ${window.localStorage.getItem('authToken')}`
  }
  if (params.type) {
    headers['Content-Type'] = params.type
  }
  const requestParams = {
    method: params.method,
    headers: headers,
  }
  if (params.type === 'application/json' && params.body) {
    requestParams.body = JSON.stringify(params.body)
  } else if (params.body) {
    requestParams.body = params.body
  }
  const request = new Request(`${apiUrl}${params.url}`, requestParams)
  return fetch(request)
    .then(response => (params.method === 'DELETE' ? response : response.json()))
    .catch(error => {
      console.error(error)
      return new Error('An error occurred. Please contact the administrator.')
    })
}

export const getDateWithTZ = (date, tz) => {
  if (!date) {
    return ''
  }
  const dt = DateTime.fromISO(
    format(new Date(date), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
  ).setZone(tz)
  return parse(
    dt.toFormat('yyyy-MM-dd HH:mm:ss'),
    'yyyy-MM-dd HH:mm:ss',
    new Date()
  )
}
