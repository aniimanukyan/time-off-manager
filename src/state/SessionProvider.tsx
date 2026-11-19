import { useState, type FC, type ReactNode } from 'react';

import { SessionContext, type Role, type User } from './SessionContext';

const STORAGE_KEY = 'role';

const MOCK_USERS: Record<Role, User> = {
  employee: { id: 'mock-employee', role: 'employee' },
  supervisor: { id: 'mock-supervisor', role: 'supervisor' },
};

const SessionProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(() => MOCK_USERS[(localStorage.getItem(STORAGE_KEY) as Role) ?? 'employee']);

  const setRole = (role: Role) => {
    localStorage.setItem(STORAGE_KEY, role);
    setUser(MOCK_USERS[role]);
  };

  return <SessionContext value={{ user, setRole }}>{children}</SessionContext>;
};

export default SessionProvider;
