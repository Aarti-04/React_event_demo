import { redirect } from "react-router-dom";
export const getTokenExpiration = () => {
  const storedexpiration = localStorage.getItem("expiration");
  const expirationDate = new Date(storedexpiration);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
};
export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const tokenDuration = getTokenExpiration();
  if (tokenDuration < 0) {
    return "EXPIRED";
  }
  return token;
};
export async function loader() {
  return getAuthToken();
}
export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth");
  }
}
