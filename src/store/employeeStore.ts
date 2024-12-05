import { create } from 'zustand';
import { Employee, EmployeeStore } from '../types/employee';
import { generateAccessCode } from '../utils/employeeUtils';
import {
  addEmployeeToFirestore,
  updateEmployeeInFirestore,
  deleteEmployeeFromFirestore,
  getEmployeesFromFirestore
} from '../services/firestore';

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
  employees: [],

  addEmployee: async (employee) => {
    const newEmployee: Employee = {
      ...employee,
      id: crypto.randomUUID(),
      accessCode: generateAccessCode(),
      createdAt: new Date().toISOString(),
    };
    
    const savedEmployee = await addEmployeeToFirestore(newEmployee);
    set((state) => ({
      employees: [...state.employees, savedEmployee],
    }));
    return savedEmployee;
  },

  updateEmployee: async (id, updates) => {
    await updateEmployeeInFirestore(id, updates);
    set((state) => ({
      employees: state.employees.map((employee) =>
        employee.id === id ? { ...employee, ...updates } : employee
      ),
    }));
  },

  deleteEmployee: async (id) => {
    await deleteEmployeeFromFirestore(id);
    set((state) => ({
      employees: state.employees.filter((employee) => employee.id !== id),
    }));
  },

  getEmployeeByAccessCode: (accessCode) => {
    return get().employees.find((employee) => employee.accessCode === accessCode) || null;
  },

  getEmployeeByUsername: (username) => {
    return get().employees.find((employee) => employee.username === username) || null;
  },

  loadEmployees: async () => {
    const employees = await getEmployeesFromFirestore();
    set({ employees });
  },
}));