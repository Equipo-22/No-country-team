import { useMutation } from "@tanstack/react-query";
import { ResetPassType } from "@/_types/resetPass-type";
import { postResetPass } from "../use-cases/resetPass-service";
import { useRouter } from "next/navigation";

export const ResetPassMutationsService = () => {
  const router = useRouter();

  const mutationPostResetPass = useMutation({
    mutationFn: (data: ResetPassType) => {
      console.log("Este es el body:", { data });
      return postResetPass(data);
    },
    onSuccess: function Exito() {
      setTimeout(() => router.push("/login"), 1000);
    },
    onError: (error) => {
      console.error("Error en reset password:", error);
    },
  });

  return {
    mutationPostResetPass,
  };
};
