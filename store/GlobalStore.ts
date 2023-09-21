import { create } from "zustand";

export const useGlobalStore = create<GlobalStore>((_set) => ({
  isLoading: false,
  isConnected: false,
  connectionInProgess: true,
  setIsLoading: (isLoading) => _set({ isLoading }),
  setIsConnected: (isConnected) => _set({ isConnected }),
  setConnectionInProgess: (connectionInProgess) =>
    _set({ connectionInProgess }),
}));

export interface GlobalStore {
  isLoading: boolean;
  isConnected: boolean;
  connectionInProgess: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setIsConnected: (isConnected: boolean) => void;
  setConnectionInProgess: (connectionInProgess: boolean) => void;
}
