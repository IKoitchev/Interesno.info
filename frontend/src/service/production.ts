import axiosClient from './apiClient';

export function getAllProductions() {
  return axiosClient.get('/productions');
}
