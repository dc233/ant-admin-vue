import $axios from '@/utils/request.js'

export function getTableList(data) {
  const url = '/admin/getTable'
  return $axios.post(url, data)
}
