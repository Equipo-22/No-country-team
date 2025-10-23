import { useMutation } from "@tanstack/react-query";
import { VerifyUserType } from "@/_types/verifyUser-type";
import {
  postVerifyUserLogin,
  postVerifyUserRegister,
} from "../use-cases/verifyUser-service";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

export const VerifyUserMutationService = () => {
  const router = useRouter();
  const setUserData = useUserStore((state) => state.setUserData);

  const mutationPostVerifyUserRegister = useMutation({
    mutationFn: (data: VerifyUserType) => {
      return postVerifyUserRegister(data);
    },
    onSuccess: (data) => {
      console.log("Usuario verificado:", data);
      setTimeout(() => router.push("/register/success"), 1000);
    },
    onError: (error) => {
      console.error("Error al verificar:", error);
    },
  });

  const mutationPostVerifyUserLogin = useMutation({
    mutationFn: (data: VerifyUserType) => {
      return postVerifyUserLogin(data);
    },
    onSuccess: (data) => {
      console.log("Usuario verificado:", data);
      setUserData(data.email, data.username);
      console.log(data.email, data.username);

      setTimeout(() => router.push("/profile-patient"), 1000);
    },
    onError: (error) => {
      console.error("Error al verificar:", error);
    },
  });

  return {
    mutationPostVerifyUserRegister,
    mutationPostVerifyUserLogin,
  };
};
