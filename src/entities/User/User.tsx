export interface AuthLogin {
  email?: string;
  password?: string;
}

export interface AuthRegister {
  email?: string;
  username?: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
}
