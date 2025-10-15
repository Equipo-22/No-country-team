import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ResetPassType } from "@/_types/resetPass-type";
import { postResetPass } from "../use-cases/medic-resetPass-service";

export const ResetPassMutationsService = () => { 

    const QueryC = useQueryClient()
    
     const mutationPostResetPass = useMutation({
        mutationFn: (data: ResetPassType) => {
            return postResetPass(data)
        },
        onSuccess: function Exito() {
            QueryC.invalidateQueries({
                queryKey: ["data_login"]
            })
        }
    })


    return {
        mutationPostResetPass
    }
}