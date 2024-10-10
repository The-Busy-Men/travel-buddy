import { UUID } from 'crypto';
import * as jwtDecode from 'jwt-decode';
import { UserRoles } from './isUserAllowed';
import {
  InvalidTokenError,
  TokenExpiredError,
  UserNotLoggedInError,
} from '../../api/errors/errors';

export interface JwtPayload {
  email: string;
  id: UUID;
  roles: UserRoles[];
  exp: number;
}

export const getUserId = (): UUID => {
  const token = localStorage.getItem('access_token');
  if (!token) throw new UserNotLoggedInError();

  try {
    // Decode the JWT to extract the payload
    const decodedToken: JwtPayload = jwtDecode.jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds

    if (decodedToken.exp! < currentTime) {
      localStorage.removeItem('access_token'); // Token expired, remove it
      throw new TokenExpiredError();
    }
    // Check if the user has at least one required role
    return decodedToken.id;
  } catch (error) {
    throw new InvalidTokenError();
  }
};
