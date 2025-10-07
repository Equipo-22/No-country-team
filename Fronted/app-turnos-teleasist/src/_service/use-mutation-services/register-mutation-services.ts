import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  postRegister } from "../use-cases/medic-register-service";
import { RegisterType } from "@/_types/register-type";

export const RegisterMutationsService = () => { 

    
    const QueryC = useQueryClient()
    
    const GetCategoria = useQuery({
        queryKey: ["data_register"],
        queryFn: postRegister,
    });
    
    
    const mutationPostCategoria = useMutation({
        mutationFn: (data: RegisterType) => {
            return postRegister(data)
        },
        onSuccess: function Exito() {
            QueryC.invalidateQueries({
                queryKey: ["data_register"]
            })
        }
    })

    return {
        mutationPostCategoria,
        GetCategoria
    }
}