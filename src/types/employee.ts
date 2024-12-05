export interface Employee {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  accessCode: string;
  createdAt: string;
  role: 'admin' | 'employee';
}

export interface EmployeeStore {
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id' | 'accessCode' | 'createdAt'>) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  getEmployeeByAccessCode: (accessCode: string) => Employee | null;
  getEmployeeByUsername: (username: string) => Employee | null;
}