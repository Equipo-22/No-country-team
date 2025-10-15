import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  email: string;
  username: string;
  setUserData: (email: string, username: string) => void;
  clearUserData: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      email: "",
      username: "",
      setUserData: (email, username) => set({ email, username }),
      clearUserData: () => set({ email: "", username: "" }),
    }),
    {
      name: "user-data",
    }
  )
);
