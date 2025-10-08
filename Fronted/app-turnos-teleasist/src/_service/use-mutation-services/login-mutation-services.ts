import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  postLogin } from "../use-cases/medic-login-service";
import { LoginType } from "@/_types/login-type";

export const LoginMutationsService = () => { 

    
    const QueryC = useQueryClient()
    
  /*   const GetCategoria = useQuery({
        queryKey: ["data_register"],
        queryFn: postRegister,
    });
     */
    
    const mutationPostLogin = useMutation({
        mutationFn: (data: LoginType) => {
            return postLogin(data)
        },
        onSuccess: function Exito() {
            QueryC.invalidateQueries({
                queryKey: ["data_login"]
            })
        }
    })

    return {
        mutationPostLogin,
        /* GetCategoria */
    }
}