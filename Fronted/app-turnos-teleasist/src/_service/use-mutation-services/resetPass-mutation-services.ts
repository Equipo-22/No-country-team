import { useMutation } from "@tanstack/react-query";
import { ResetPassType } from "@/_types/resetPass-type";

import { postResetPass } from "../use-cases/resetPass-service";

export const ResetPassMutationsService = () => {

  const mutationPostResetPass = useMutation({
    mutationFn: (data: ResetPassType & { redirect?: boolean; onClose?: () => void }) => {
      return postResetPass(data);
    },
    onError: (error) => {
      console.error("Error en reset password:", error);
    },
  });

  return {
    mutationPostResetPass,
  };
};
