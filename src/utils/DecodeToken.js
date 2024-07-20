export function decodeToken(token) {
    if (!token) return null;
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }
  