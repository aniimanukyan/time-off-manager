import { createContext, use } from 'react';

export type Role = 'employee' | 'supervisor';

export type User = { id: string; role: Role };

export type SessionStore = {
  user: User;
  setRole: (role: Role) => void;
};

export const SessionContext = createContext<SessionStore>(null!);

export const useSession = (): SessionStore => use(SessionContext);
