import { AxiosError, AxiosResponse } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { api, setApiToken } from "@renderer/api";
import { setMe } from "@renderer/cache";

type Params = {
    identifier: string;
    password: string;
};

type Return = {
    id: number;
    address: string;
    email: string;
    name: string;
    phone: string;
    specialty: string;
    token: string;
};

export function useLoginMutation(
    options?: UseMutationOptions<Return, AxiosError, Params>
) {
    return useMutation<Return, AxiosError, Params>(
        (params) =>
            api
                .post<Params, AxiosResponse<Return>>("/api/v1/login", {
                    email: params.identifier,
                    password: params.password,
                })
                .then((res) => res.data),
        {
            ...options,
            onSuccess: async (...params) => {
                console.log(params);
                setApiToken(params[0].token);
                setMe(params[0]);
                (window as any).electronAPI.setPassword(
                    "token",
                    params[0].token
                );
                console.log("params: ", params);
            },
        }
    );
}