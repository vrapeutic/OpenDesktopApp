import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api, setApiToken } from '@renderer/api';
import { setMe} from '@renderer/cache';

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
        .post<Params, AxiosResponse<Return>>('/api/v1/sign_in', {
          email: params.identifier,
          password: params.password,
        })
        .then((res) => res.data),
    {
      ...options,
      onSuccess: async (data:any) => {
        console.log('Login successful:', data);
        setApiToken(data?.token);
        setMe(data);
        {data.doctor&& localStorage.setItem("USER", data.doctor.attributes.name)}
       
        {data.doctor&&  localStorage.setItem("USERImg", data.doctor.attributes.photo_url)}
       
        (window as any).electronAPI.setPassword('token', data?.token);
      
      },
    }
  );
}
