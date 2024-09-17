import { getMe } from '@renderer/cache';
import { config } from '@renderer/config';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getEvaluation = async (id: number) => {
  const token = getMe()?.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(
      `${config.apiURL}/api/v1/centers/${id}/sessions/evaluations?include=software_modules,doctors`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const useGetEvaluation = (id: number) => {
  return useQuery({
    queryKey: ['getEvaluation', id],
    queryFn: () => getEvaluation(id),
  });
};
