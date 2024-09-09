import * as jwt_decode from 'jwt-decode'; // Optional, to decode JWT tokens

export const isUserLoggedIn = () => {
  const token = localStorage.getItem('access_token');

  if (!token) return false; // No token, user is not logged in

  try {
    const decodedToken = jwt_decode.jwtDecode(token); // Decode the token (optional)
    const currentTime = Date.now() / 1000; // Current time in seconds

    // Check if token has expired
    if (decodedToken.exp! < currentTime) {
      localStorage.removeItem('access_token'); // Token expired, remove it
      return false;
    }

    return true; // Token is valid, user is logged in
  } catch (error) {
    return false; // Error decoding token, assume user is not logged in
  }
};
