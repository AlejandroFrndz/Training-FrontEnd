import http from '../http-common';

interface LoginResponse {
  msg: string;
  token: string;
}

class AuthService {
  private resource: string;

  constructor() {
    this.resource = '/auth';
  }

  login(username: string, password: string) {
    return http.post<LoginResponse>(`${this.resource}/login`, {
      username,
      password
    });
  }

  checkToken(token: string) {
    return http.get(`${this.resource}/token`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}

export default new AuthService();
