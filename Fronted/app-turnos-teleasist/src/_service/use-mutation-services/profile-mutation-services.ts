import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { postProfile } from "../use-cases/profile-service";
import { ProfilePayload} from "@/_types/profile-type";

export const ProfileMutationsService = () => {
  const router = useRouter();

  const mutationPostProfile = useMutation({
    mutationFn: (data: ProfilePayload) => {
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
