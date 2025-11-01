import { useMutation } from "@tanstack/react-query";
import { postRegister } from "../use-cases/register-service";
import { RegisterType } from "@/_types/register-type";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

export const RegisterMutationsService = () => {
  const router = useRouter();
  const setUserData = useUserStore((state) => state.setUserData);

  const mutationPostRegister = useMutation({
    mutationFn: (data: RegisterType) => {
      return postRegister(data);
    },
    onSuccess: function Exito(_res, variables) {
      setUserData({ email: variables.email, username: variables.username });
      router.push("/verify-user-register");
    },
  });

  return {
    mutationPostRegister,
  };
};
