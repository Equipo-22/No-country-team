import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  idUser: string,
  idPatient: string,
  email: string;
  username: string;
  hasHydrated: boolean;
  setUserData: (data: Partial<Pick<UserState, "idUser" | "idPatient" | "email" | "username">>) => void;
  clearUserData: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      idUser: "",
      idPatient: "",
      email: "",
      username: "",
      hasHydrated: false,

      setUserData: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),

      clearUserData: () => set({ idUser: "", idPatient: "", email: "", username: "" }),

      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "user-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
