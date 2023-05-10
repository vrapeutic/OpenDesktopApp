import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { config } from "@renderer/config";

type Params = {
    identifier: string;
    password: string;
};

type Return = {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
};
export function useLoginMutation(
    options?: UseMutationOptions<Return, AxiosError, Params>
) {
    return useMutation<Return, AxiosError, Params>(
        (params) =>
            axios
                .post<Params, AxiosResponse<Return>>(
                    `${config.apiURL}/api/v1/login`,
                    {
                        email: params.identifier,
                        password: params.password,
                    }
                )
                .then((res) => res.data),
        {
            ...options,
            onSuccess: async (...params) => {
                console.log("params: ", params);
            },
        }
    );
}
