import { type } from "os";

const API_BASE_USER = '/api/user'
const API_BASE_INFO = '/api/info'
const isEmpty = function (val) {
  return (
    undefined === val ||
    null === val ||
    ('object' === typeof val && 0 === Object.keys(val).length) ||
    ('string' === typeof val && 0 === val.trim().length)
  )
}
export { API_BASE_INFO, API_BASE_USER, isEmpty }