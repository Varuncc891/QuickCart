export function isSessionValid() {
  const token = localStorage.getItem('token');
  const loginTime = localStorage.getItem('loginTime');
  const now = new Date().getTime();

  if (!token || !loginTime) return false;

  const diff = now - parseInt(loginTime, 10);
  return diff <= 15 * 60 * 1000;
}
