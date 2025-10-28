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
      router.push("/register/success");
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
      setUserData({ id: data.id, email: data.email, username: data.username });
      router.push("/profile-patient");
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
