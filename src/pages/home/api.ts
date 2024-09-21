import { config as baseConfig } from '@renderer/config';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

export const apiClient: AxiosInstance = axios.create({
  baseURL: `${baseConfig.apiURL}/api/v1/`,
  headers: {
    'Content-type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const token = await (window as any).electronAPI.getPassword('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Failed to get token ', error);
    }

    return config;
  }
);

const getCentersData = async () => {
  try {
    const response = await apiClient.get(
      'doctors/home_centers?include=center_social_links,specialties'
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getCenter = async (id: string) => {
  try {
    const response = await apiClient.get(
      `centers/${id}/sessions?include=software_modules,doctors`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getDoctorsData = async (id: string) => {
  try {
    const response = await apiClient.get(`centers/${id}/doctor_centers`, {
      params: {
        include: 'doctor,center',
        'q[role_eq]': 'admin',
      },
    });
    return {
      data: response.data.data, // Assign data to a key
      included: response.data.included, // Assign included to a key
    };
  } catch (error) {
    console.log(error);
  }
};

const useGetCentersData = () => {
  return useQuery({
    queryKey: ['centers'],
    queryFn: () => getCentersData(),
  });
};

const useGetCenter = () => {
  return useMutation({
    mutationKey: ['center'],
    mutationFn: (id: string) => getCenter(id),
  });
};

const useGetDoctorsData = (id: string) => {
  return useQuery({
    queryKey: ['doctor_centers', id],
    queryFn: () => getDoctorsData(id),
  });
};

export { useGetCentersData, useGetCenter, useGetDoctorsData };
