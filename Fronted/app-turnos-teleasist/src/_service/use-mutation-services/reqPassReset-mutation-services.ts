import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ReqPassResetType } from "@/_types/reqPassReset-type";
import { postReqPassReset } from "../use-cases/reqPassReset-service";

export const ReqPassResetMutationsService = () => {
  const router = useRouter();

  const mutationPostReqPassReset = useMutation({
    mutationFn: (data: ReqPassResetType & { redirect?: boolean }) => {
      return postReqPassReset(data);
    },
     onSuccess: function Exito(_res, variables) {
    if (variables.redirect !== false) { 
      router.push("/login/reset-pass")
    }
  },
    onError: (error) => {
      console.error("Error en solicitud de reset:", error);
    },
  });

  return {
    mutationPostReqPassReset,
  };
};
