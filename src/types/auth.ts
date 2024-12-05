export interface User {
  id: string;
  role: 'admin' | 'employee';
  accessCode: string;
}

export interface AuthStore {
  user: User | null;
  login: (username: string, accessCode: string) => boolean;
  logout: () => void;
}