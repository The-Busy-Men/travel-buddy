// Custom error classes for different error scenarios
export class UserNotLoggedInError extends Error {
  constructor(message = 'User is not logged in') {
    super(message);
    this.name = 'UserNotLoggedInError';
  }
}

export class TokenExpiredError extends Error {
  constructor(message = 'Token has expired') {
    super(message);
    this.name = 'TokenExpiredError';
  }
}

export class InvalidTokenError extends Error {
  constructor(message = 'Invalid token') {
    super(message);
    this.name = 'InvalidTokenError';
  }
}
