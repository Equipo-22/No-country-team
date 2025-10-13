import { useMutation } from "@tanstack/react-query";
import { VerifyUserType } from "@/_types/verifyUser-type";
import { postVerifyUserLogin, postVerifyUserRegister  } from "../use-cases/verifyUser-service";
import { useRouter } from "next/navigation";


export const VerifyUserMutationService = () => {
    
    const router = useRouter();

    const mutationPostVerifyUserRegister = useMutation({
      mutationFn: (data: VerifyUserType) => {
        return postVerifyUserRegister (data);
      },
      onSuccess: (data) => {
        console.log("Usuario verificado:", data);
        setTimeout(() => router.push("/login"), 1000)
      },
      onError: (error) => {
        console.error("Error al verificar:", error);
      },
    });
    

    const mutationPostVerifyUserLogin = useMutation({
      mutationFn: (data: VerifyUserType) => {
        return postVerifyUserLogin (data);
      },
      onSuccess: (data) => {
        console.log("Usuario verificado:", data);
        setTimeout(() => router.push("/dashboard-patient"), 1000)
      },
      onError: (error) => {
        console.error("Error al verificar:", error);
      },
    });

    return {
        mutationPostVerifyUserRegister,
        mutationPostVerifyUserLogin
    }
} 



