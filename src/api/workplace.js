import $axios from "@/utils/request.js";

export function getProjecyt(data) {
  const url = "/admin/projecyt";
  return $axios.post(url, data);
}
export function getDynamic(data) {
  const url = "/admin/dynamic";
  return $axios.post(url, data);
}
export function getRadar(data) {
  const url = "/admin/radar";
  return $axios.post(url, data);
}
