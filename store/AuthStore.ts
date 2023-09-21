import { create } from "zustand";

export const useAuthStore = create<AuthStore>((_set) => ({
  user: null,
  localUser: null,
  authLoading: true,
  confirmationResult: null,
  setUser: (user) => _set({ user }),
  setLocalUser: (localUser) => _set({ localUser }),
  setAuthLoading: (authLoading) => _set({ authLoading }),
  setConfirmationResult: (confirmationResult) => _set({ confirmationResult }),
}));

interface AuthStore {
  user: Auth;
  localUser: LocalAuth;
  authLoading: boolean;
  confirmationResult: any;
  setUser: (auth: Auth) => void;
  setLocalUser: (auth: LocalAuth) => void;
  setAuthLoading: (authLoading: boolean) => void;
  setConfirmationResult: (confirmationResult: any) => void;
}

type Auth = null | { token: string; user: any };
type LocalAuth = null | {
  token: string;
  username: string;
  email: string;
  phone: string;
  name: string;
};
