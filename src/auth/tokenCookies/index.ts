export const COOKIE_NAME = 'TravelLogAppFirebaseToken';

export const setTokenCookie = (token: string): void => {
  fetch('/api/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  });
};

export const removeTokenCookie = (): void => {
  fetch('/api/logout', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
};
