import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthProps {
  currentUser: any;
  setCurrentUser: (newUser: any) => void;
  removeCurrentUser: () => void;
  updateCurrentUser: (updateUser: any) => void;
}

const useStore = create<AuthProps, [["zustand/persist", AuthProps]]>(
  persist(
    (set) => ({
      currentUser: null,
      setCurrentUser: (newUser) => set({ currentUser: newUser }),
      removeCurrentUser: () => set({ currentUser: null }),
      updateCurrentUser: (updateUser) => set({ currentUser: updateUser }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useStore;
