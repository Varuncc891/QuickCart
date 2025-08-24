export function isSessionValid() {
  const token = localStorage.getItem("token");
  return !!token;
}
