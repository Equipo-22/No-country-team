import { useMutation } from "@tanstack/react-query";
import { ResetPassType } from "@/_types/resetPass-type";

import { useRouter } from "next/navigation";
import { postResetPass } from "../use-cases/resetPass-service";

export const ResetPassMutationsService = () => {
  const router = useRouter();

  const mutationPostResetPass = useMutation({
    mutationFn: (data: ResetPassType & { redirect?: boolean; onClose?: () => void }) => {
      return postResetPass(data);
    },
    onSuccess: function Exito(_res, variables) {
       if (variables.redirect !== false) { 
      setTimeout(() => router.push("/login"), 1000)
    }else if (variables.onClose) {
        variables.onClose();
      }
    },
    onError: (error) => {
      console.error("Error en reset password:", error);
    },
  });

  return {
    mutationPostResetPass,
  };
};
