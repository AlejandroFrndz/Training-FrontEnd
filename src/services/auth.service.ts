import http from '../http-common';

interface LoginResponse {
  msg: string;
  token: string;
}

class AuthService {
  login(username: string, password: string) {
    return http.post<LoginResponse>('/auth/login', { username, password });
  }
}

export default new AuthService();
