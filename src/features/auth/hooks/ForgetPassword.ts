import { config } from '@renderer/config';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface ResetPassword {
  password: string;
  confirmPassword: string;
}

interface ResetPasswordParams {
  token: string;
  email?: string;
  requestBody: ResetPassword;
}

const sendEmail = async (email: string) => {
  try {
    const response = await axios.get(
      `${config.apiURL}/api/v1/forget_password`,
      {
        params: {
          email: email,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
const resetPassword = async ({
  token,
  email,
  requestBody,
}: ResetPasswordParams) => {
  try {
    const response = await axios.post(
      `${config.apiURL}/api/v1/reset_password?token=${token}`,
      { data: requestBody }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const useSendEmail = () => {
  return useMutation({
    mutationKey: ['forget-password'],
    mutationFn: (email: string) => sendEmail(email),
  });
};
const useResetPassword = () => {
  return useMutation({
    mutationKey: ['reset-password'],
    mutationFn: resetPassword,
  });
};
export { useResetPassword, useSendEmail };
