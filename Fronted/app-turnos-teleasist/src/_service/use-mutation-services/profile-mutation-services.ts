import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getProfileById, postProfile } from "../use-cases/profile-service";
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

  const mutationGetProfileById = useMutation({
    mutationFn: (id: string) => {
      return getProfileById(id);
    },
    onSuccess: function Exito() {
      console.log("Se obtuvo los datos del perfil");
    },
  });

  return {
    mutationPostProfile,
    mutationGetProfileById,
  };
};
