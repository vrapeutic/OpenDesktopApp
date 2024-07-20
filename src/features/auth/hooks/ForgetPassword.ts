import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface ResetPassword {
  password: string;
  confirmPassword: string;
}

interface ResetPasswordParams {
  token: string;
  requestBody: ResetPassword;
}

const sendEmail = async (email: string) => {
  try {
    const response = await axios.get(
      `http://vrapeutic-api-production.eba-7rjfenj2.eu-west-1.elasticbeanstalk.com/api/v1/forget_password`,
      {
        params: {
          email: email,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
const resetPassword = async ({ token, requestBody }: ResetPasswordParams) => {
  try {
    const response = await axios.post(
      `http://vrapeutic-api-production.eba-7rjfenj2.eu-west-1.elasticbeanstalk.com/api/v1//reset_password?token=${token}`,
      requestBody
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
