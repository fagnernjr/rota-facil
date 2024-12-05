import { create } from 'zustand';
import { AuthStore, User } from '../types/auth';
import { useEmployeeStore } from './employeeStore';
import { DEFAULT_USERS } from '../utils/defaultUsers';

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  
  login: (username: string, accessCode: string) => {
    // Check default users first
    const defaultUser = Object.values(DEFAULT_USERS).find(
      user => user.username === username && user.accessCode === accessCode
    );

    if (defaultUser) {
      const user: User = {
        id: 'default',
        role: defaultUser.role,
        accessCode: defaultUser.accessCode,
      };
      set({ user });
      return true;
    }

    // Check employee by access code
    const employee = useEmployeeStore.getState().getEmployeeByAccessCode(accessCode);
    if (employee && employee.username === username) {
      const user: User = {
        id: employee.id,
        role: employee.role,
        accessCode: employee.accessCode,
      };
      set({ user });
      return true;
    }

    return false;
  },
  
  logout: () => {
    set({ user: null });
  },
}));