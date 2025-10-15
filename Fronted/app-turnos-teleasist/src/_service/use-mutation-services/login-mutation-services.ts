import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postLogin } from "../use-cases/medic-login-service";
import { LoginType } from "@/_types/login-type";
import { useRouter } from "next/navigation";

export const LoginMutationsService = () => {
  const router = useRouter();

  const mutationPostLogin = useMutation({
    mutationFn: (data: LoginType) => {
      return postLogin(data);
    },
    onSuccess: function Exito() {
        console.log("Login ok");
      setTimeout(() => router.push("/verify-user-login"), 1000);
    },
  });

  return {
    mutationPostLogin,
  };
};

/*const QueryC = useQueryClient()
    
    const GetCategoria = useQuery({
        queryKey: ["data_register"],
        queryFn: postRegister,
        });
    QueryC.invalidateQueries({
            queryKey: ["data_login"]
        })
    }
        */
