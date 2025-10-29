import { useMutation } from "@tanstack/react-query";
import { VerifyUserType } from "@/_types/verifyUser-type";
import {
  postVerifyUserLogin,
  postVerifyUserRegister,
} from "../use-cases/verifyUser-service";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { ProfileMutationsService } from "./profile-mutation-services";

export const VerifyUserMutationService = () => {
  const router = useRouter();
  const setUserData = useUserStore((state) => state.setUserData);
  const { mutationGetProfileById } = ProfileMutationsService();

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
      setUserData({
        idUser: data.id,
        email: data.email,
        username: data.username,
      });

      mutationGetProfileById.mutate(data.id, {
        onSuccess: (profile) => {
          if (profile && profile.id) {
            console.log("Perfil encontrado:", profile);
            setUserData({ idPatient: profile.id });
            router.push("/dashboard-patient/inicio");
          }
        },
        onError: (error) => {
          console.warn("No se encontró perfil de paciente:", error);
          router.push("/profile-patient");
        },
      });
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
