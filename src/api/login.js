import $axios from "@/utils/request.js";

export function login(data) {
  const url = "/admin/login";
  return $axios.post(url, data);
}
export function getInfo() {
  const url = "/getInfo";
  return $axios.get(url);
}
export function logout(data) {
  const url = "login/logout";
  return $axios.post(url, data);
}
