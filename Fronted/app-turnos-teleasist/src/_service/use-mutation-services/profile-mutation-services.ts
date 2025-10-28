import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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
