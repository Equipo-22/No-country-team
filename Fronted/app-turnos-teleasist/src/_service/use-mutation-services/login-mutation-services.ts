import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postLogin } from "../use-cases/login-service";
import { LoginType } from "@/_types/login-type";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

export const LoginMutationsService = () => {
  const router = useRouter();
  const setUserData = useUserStore((state) => state.setUserData);

  const mutationPostLogin = useMutation({
    mutationFn: (data: LoginType) => {
      return postLogin(data);
    },
    onSuccess: function Exito(_res, variables) {
        console.log("Login ok");
        setUserData({ email: variables.email });
      setTimeout(() => router.push("/verify-user-login"), 1000);
    },
  });

  return {
    mutationPostLogin,
  };
};

