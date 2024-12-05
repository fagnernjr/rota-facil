import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { KeyRound, User, Info, Eye, EyeOff } from 'lucide-react';
import { DEFAULT_USERS } from '../utils/defaultUsers';
import { useEmployeeStore } from '../store/employeeStore';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showDefaultCredentials, setShowDefaultCredentials] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Ensure stores are loaded
    await useEmployeeStore.getState().loadEmployees();

    const success = login(username, accessCode);
    
    if (success) {
      const defaultUser = Object.values(DEFAULT_USERS).find(
        user => user.username === username && user.accessCode === accessCode
      );
      
      if (defaultUser) {
        navigate(defaultUser.role === 'admin' ? '/admin' : '/employee');
        return;
      }

      // Check employee
      const employee = useEmployeeStore.getState().getEmployeeByAccessCode(accessCode);
      if (employee) {
        navigate(employee.role === 'admin' ? '/admin' : '/employee');
        return;
      }
    }

    setError('Invalid username or access code');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
              required
            />
            <User className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Access Code
          </label>
          <div className="mt-1 relative">
            <input
              type={showPassword ? "text" : "password"}
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your access code"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <button
            onClick={() => setShowDefaultCredentials(!showDefaultCredentials)}
            className="px-2 bg-white text-gray-500 hover:text-gray-700 flex items-center space-x-1"
          >
            <Info className="w-4 h-4" />
            <span>Default Login Credentials</span>
          </button>
        </div>
      </div>

      {showDefaultCredentials && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Quick Access Credentials:</h3>
          <div className="space-y-2 text-sm">
            {Object.entries(DEFAULT_USERS).map(([key, user]) => (
              <div key={key} className="flex justify-between items-center p-2 bg-white rounded border border-gray-200">
                <div>
                  <span className="font-medium capitalize">{key}:</span>
                  <div className="text-gray-500">
                    Username: <code className="bg-gray-100 px-1 rounded">{user.username}</code>
                  </div>
                  <div className="text-gray-500">
                    Access Code: <code className="bg-gray-100 px-1 rounded">{user.accessCode}</code>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setUsername(user.username);
                    setAccessCode(user.accessCode);
                  }}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Use
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}