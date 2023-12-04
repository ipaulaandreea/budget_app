import {redirect} from 'react-router-dom'
export function action() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("sessions");
  document.cookie = `refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  localStorage.removeItem('user');
  return redirect("/auth");
}

export default action;