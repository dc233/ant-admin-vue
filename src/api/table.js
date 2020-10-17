import $axios from '@/utils/request.js'

export function getTableList(data) {
  const url = '/admin/getTable'
  return $axios.post(url, data)
}
export function goodsList(data) {
  const url = '/admin/goodlist'
  return $axios.post(url, data)
}
