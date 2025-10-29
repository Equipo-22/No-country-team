import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getProfileByIdUser, getProfileByIdPatient, postProfile } from "../use-cases/profile-service";
import { ProfilePayload } from "@/_types/profile-type";
import { useUserStore } from "@/store/userStore";

export const ProfileMutationsService = () => {
  const router = useRouter();
  const setUserData = useUserStore((state) => state.setUserData);

  const mutationPostProfile = useMutation({
    mutationFn: (data: ProfilePayload) => {
      return postProfile(data);
    },
    onSuccess: (data) => {
      console.log("data", data);
      
      setUserData({
        idPatient: data.id
      });
      router.push("/welcome-patient");
    },
  });

  const mutationGetProfileByIdPatient = useMutation({
    mutationFn: (id: string) => {
      return getProfileByIdPatient(id);
    },
    onSuccess: function Exito() {
      console.log("Se obtuvo los datos del perfil");
    },
  });

   const mutationGetProfileByIdUser = useMutation({
    mutationFn: (id: string) => {
      return getProfileByIdUser(id);
    },
    onSuccess: function Exito() {
      console.log("Se obtuvo los datos del perfil");
    },
  });

  return {
    mutationPostProfile,
    mutationGetProfileByIdPatient,
    mutationGetProfileByIdUser,
  };
};
