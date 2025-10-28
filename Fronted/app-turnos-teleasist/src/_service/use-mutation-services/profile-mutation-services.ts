import { useMutation } from "@tanstack/react-query";
import { postRegister } from "../use-cases/register-service";
import { RegisterType } from "@/_types/register-type";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { postProfile } from "../use-cases/profile-service";
import { ProfileType } from "@/_types/profile-type";

export const ProfileMutationsService = () => {
  const router = useRouter();

  const mutationPostProfile = useMutation({
    mutationFn: (data: ProfileType) => {
      return postProfile(data);
    },
    onSuccess: function Exito() {
      router.push("/welcome-patient");
    },
  });

  return {
    mutationPostProfile,
  };
};
